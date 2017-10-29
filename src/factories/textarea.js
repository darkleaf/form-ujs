import React from 'react';
import bind from 'memoize-bind';
import classNames from 'classnames';
import t from 'transit-js';
const kw = t.keyword;
import generateId from '../generate-id';

export default function Textarea(desc) {
  const widgetId = desc.get(kw('id'));

  return class extends React.PureComponent {
    static displayName = `Textarea(${widgetId})`;
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
      const inputClass = classNames(
        'form-control',
        {'is-invalid': errors.length > 0}
      );

      return (
        <div className="form-group" data-widget-id={widgetId}>
          <label htmlFor={this.id}>{widgetId.toString()}</label>
          <textarea id={this.id}
                    className={inputClass}
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
