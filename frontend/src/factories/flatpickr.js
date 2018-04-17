import React from 'react';
import bind from 'memoize-bind';

import classNames from 'classnames';
import style from './style.module.css';

import Flatpickr from 'react-flatpickr';
import './flatpickr.css';
import l10n from 'flatpickr/dist/l10n';

import t from 'transit-js';
const kw = t.keyword;

function getOptions(desc) {
  let options = desc.get(kw('options'));
  if (!options) return {};
  return JSON.parse(options);
}

export default function FlatpickrFactory(desc) {
  const label = desc.get(kw('label'));
  const type = desc.get(kw('type'));

  const options = getOptions(desc);
  if (typeof options.locale === 'string') {
    options.locale = l10n[options.locale];
  }

  return class extends React.PureComponent {
    static displayName = 'Flatpickr$';

    static defaultProps = {
      errors: t.map()
    };

    constructor(props) {
      super(props);
    }

    onChange(date) {
      this.props.onChange(date);
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
        style['c-hint--error']
      );

      return (
        <label className={labelClass}>
          {label}

          <Flatpickr options={options}
                     className={inputClass}
                     value={this.props.data}
                     onChange={bind(this.onChange, this)} />
          <div className={hintClass}>{error}</div>
        </label>
      );
    }
  };
}
