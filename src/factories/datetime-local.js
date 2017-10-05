import React from 'react';
import ReactDOM from 'react-dom';
import bind from 'memoize-bind';
import fecha from 'fecha';

import t from 'transit-js';
const kw = t.keyword;

const format = 'YYYY-MM-DDTHH:mm';

export default function DatetimeLocal(desc) {
  const name = desc.get(kw('id'));
  return class extends React.PureComponent {
    static displayName = `DatetimeLocal(${name})`

    //todo: для safari и прочих нужна своя реализация,
    //т.к. событие будет приходить как от обычного инпута
    handleChange(e) {
      const textValue = e.target.value;
      const value = fecha.parse(textValue, format);

      //value может быть false, если не распрасилось

      this.props.onChange(value);
    }

    render() {
      const value = fecha.format(this.props.data, format);
      return (
        <div className="form-group">
          <label>{name.toString()}</label>
          <input className="form-control"
                 type="datetime-local"
                 value={value}
                 onChange={bind(this.handleChange, this)} />
        </div>
      );
    }
  };
}

window.fecha = fecha;
