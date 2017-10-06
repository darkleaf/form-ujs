import React from 'react';
import bind from 'memoize-bind';
import t from 'transit-js';
const kw = t.keyword;

import widgetBuilder from '../widget-builder';

const writer = t.writer('json');

export default function Submit(desc) {
  const id = desc.get(kw('id'));
  const url = desc.get(kw('url'));
  const method = desc.get(kw('method'));
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
          const str = writer.write(this.props.data);

          console.log(str);

          setTimeout(() => this.setState({loading: false}), 2000);
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
