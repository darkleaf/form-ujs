import React from 'react';
import ReactDOM from 'react-dom';
import bind from 'memoize-bind';
import classNames from 'classnames';
import t from 'transit-js';
const kw = t.keyword;

export default function Input(desc) {
  const name = desc.get(kw('id'));

  const defaultData = "";
  const defaultErrors = t.map();

  return class extends React.PureComponent {
    static displayName = `Input(${name})`

    data() {
      return this.props.data || defaultData;
    }

    errors() {
      //todo: react default props
      return this.props.errors || defaultErrors;
    }

    ownErrors() {
      return this.errors().get(kw('form-ujs/errors')) || [];
    }

    onChange(e) {
      this.props.onChange(e.target.value);
    }

    render() {
      const errors = this.ownErrors();

      return (
        <div className="form-group">
          <label>{name.toString()}</label>
          <input className={classNames('form-control', {'is-invalid': errors.length > 0})}
                 value={this.data()}
                 onChange={bind(this.onChange, this)} />
          {errors.map(error => <div className="invalid-feedback">{error}</div>)}
        </div>
      );
    }
  };
}
