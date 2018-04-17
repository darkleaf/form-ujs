import React from 'react';
import bind from 'memoize-bind';

import _chunk from 'lodash/chunk';
import _isArray from 'lodash/isArray';

import t from 'transit-js';
const kw = t.keyword;

import widgetBuilder from '../widget-builder';

import classNames from 'classnames';
import style from './style.module.css';

export default function Group(desc) {
  const nested = desc.get(kw('nested'));
  if (!_isArray(nested))
    throw new TypeError('group: nested must be an array');
  if (nested.length % 2 !== 0)
    throw new TypeError('group: nested must contain even number of elements');

  const widgets = _chunk(nested, 2).map(([key, desc]) => {
    return [key, widgetBuilder(desc)];
  });

  return class extends React.PureComponent {
    static displayName = 'Group$';

    static defaultProps = {
      data: t.map(),
      errors: t.map()
    };

    onChange(key, value) {
      const data = this.props.data.clone();
      data.set(key, value);
      this.props.onChange(data);
    }

    render() {
      const error = this.props.errors.get(kw('form-ujs/error'));

      const errorClass = classNames(
        style['c-alert'],
        style['c-alert--error']
      );

      return (
        <fieldset className={style['o-fieldset']}>
          {widgets.map(([key, Widget]) => {
            const wData = this.props.data.get(key);
            const wErrors = this.props.errors.get(key);
            const wOnChage = bind(this.onChange, this, key);
            return <Widget
                       key={key}
                       data={wData}
                       errors={wErrors}
                       onChange={wOnChage} />;
          })}

          {error && <div className={errorClass}>
              {error}
          </div>}
        </fieldset>
      );
    }
  };
}
