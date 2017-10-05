import React from 'react';
import ReactDOM from 'react-dom';
import bind from 'memoize-bind';
import t from 'transit-js';
const kw = t.keyword;

import widgetBuilder from '../widget-builder';

export default function Form(desc) {
  const id = desc.get(kw('id'));
  const body = desc.get(kw('body'));
  const Body = widgetBuilder(body);

  return class extends React.Component {
    static displayName = `Form(${id})`

    constructor(props) {
      super(props);
      this.state = {
        data: this.props.initialData,
        errors: this.props.initialErrors
      };
    }

    handleChange(data) {
      this.setState({data});
    }

    render() {
      return (
        <Body data={this.state.data}
              errors={this.state.errors}
              onChange={bind(this.handleChange, this)} />
      );
    }
  };
}
