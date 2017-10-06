import React from 'react';
import bind from 'memoize-bind';

export default class State extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.initialData,
      errors: this.props.initialErrors
    };
  }

  onChange(data) {
    this.setState({data});
  }

  setErrors(errors) {
    this.setState({errors});
  }

  render() {
    const Widget = this.props.widget;
    return (
      <Widget data={this.state.data}
              errors={this.state.errors}
              onChange={bind(this.onChange, this)}
              setErrors={bind(this.setErrors, this)} />
    );
  }
}
