import React from 'react';
import bind from 'memoize-bind';

import _isString from 'lodash/isString';

import classNames from 'classnames';
import style from './style.module.css';

import t from 'transit-js';
const kw = t.keyword;

export default function Textarea(desc) {
  const label = desc.get(kw('label'));
  if (!_isString(label))
    throw new TypeError('textarea: label must be a string');

  return class extends React.PureComponent {
    static displayName = 'Textarea$';

    static defaultProps = {
      data: "",
      errors: t.map()
    };

    constructor(props) {
      super(props);
    }

    onChange(e) {
      this.props.onChange(e.target.value);
    }

    render() {
      const error = this.props.errors.get(kw('form-ujs/error'));

      const labelClass = classNames(
        style['o-form-element'],
        style['c-label']
      );

      const inputClass = classNames({
        [style['c-field']]: true,
        [style['c-field--label']]: true,
        [style['c-field--error']]: error
      });

      const hintClass = classNames(
        style['c-hint'],
        style['c-hint--error'],
      );

      return (
        <label className={labelClass}>
          {label}
          <textarea className={inputClass}
                    value={this.props.data}
                    onChange={bind(this.onChange, this)} />
          <div className={hintClass}>{error}</div>
        </label>
      );
    }
  };
}
