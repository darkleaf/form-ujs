/* global fetch */

import React from 'react';
import bind from 'memoize-bind';
import t from 'transit-js';
const kw = t.keyword;

import widgetBuilder from '../widget-builder';

const writer = t.writer('json');
const reader = t.reader('json');

export default function Submit(desc) {
  const id = desc.get(kw('id'));
  const url = desc.get(kw('url'));
  const method = desc.get(kw('method')).name();
  const body = desc.get(kw('body'));
  const Body = widgetBuilder(body);

  return class extends React.Component {
    static displayName = `Submit(${id})`

    constructor(props) {
      super(props);

      this.state = { loading: false };
    }

    onChange(data) {
      if (this.state.loading) return;
      this.props.onChange(data);
    }

    setErrors(errors) {
      if (this.state.loading) return;
      this.props.setErrors(errors);
    }

    //ajax and redirect
    onSubmit() {
      if (this.state.loading) return;
      this.setState(
        {loading: true},
        () => {
          const body = writer.write(this.props.data);
          const headers = {
            'Content-Type': 'application/transit+json'
          };
          fetch(url, {method, body, headers, credentials: 'include'}).then(resp => {
            //todo split by functions
            this.setState({loading: false}, () => {
              if (resp.status === 422) {
                resp.text().then(text => {
                  const errors = reader.read(text);
                  this.setErrors(errors);
                });
              } else if (resp.status === 200) {
                const location = resp.headers.get('Location');
                window.location = location;
              } else {
                //todo handle
                console.log(resp);
              }
            });
          });
        }
      );
    }

    render() {
      return (
        <div>
          <Body data={this.props.data}
                errors={this.props.errors}
                onChange={bind(this.onChange, this)}
                setErrors={bind(this.setErrors, this)} />
          <button className="btn btn-primary"
                  disabled={this.state.loading}
                  onClick={bind(this.onSubmit, this)}>
            {this.state.loading ? 'loading...' : 'submit'}
          </button>
        </div>
      );
    }
  };
}
