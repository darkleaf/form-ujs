import React from 'react';
import bind from 'memoize-bind';
import classNames from 'classnames';
import t from 'transit-js';
const kw = t.keyword;
import generateId from '../generate-id';

export default function Input(desc) {
  const name = desc.get(kw('id'));

  return class extends React.PureComponent {
    static displayName = `Input(${name})`;
    static defaultProps = {
      data: "",
      errors: t.map()
    };

    constructor(props) {
      super(props);
      this.id = generateId();
    }

    onChange(e) {
      this.props.onChange(e.target.value);
    }

    render() {
      const errors = this.props.errors.get(kw('form-ujs/errors')) || [];

      return (
        <div className="form-group">
          <label htmlFor={this.id}>{name.toString()}</label>
          <input id={this.id}
                 className={classNames('form-control', {'is-invalid': errors.length > 0})}
                 value={this.props.data}
                 onChange={bind(this.onChange, this)} />
            {errors.map((error, idx) => {
              return <div key={idx} className="invalid-feedback">{error}</div>;
            })}
        </div>
      );
    }
  };
}
