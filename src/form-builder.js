import React from 'react';
import widgetBuilder from './widget-builder';

export default function formBuilder(desc, initialData, initialErrors) {
  const Widget = widgetBuilder(desc);

  return class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: initialData,
        errors: initialErrors
      };
    }

    handleChange = data => this.setState({data})

    render() {
      return (
        <Widget data={this.state.data}
                errors={this.state.errors}
                onChange={this.handleChange} />
      );
    }
  };
}
