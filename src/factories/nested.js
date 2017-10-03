import React from 'react';
import ReactDOM from 'react-dom';
import bind from 'memoize-bind';
import t from 'transit-js';
const kw = t.keyword;

import widgetBuilder from '../widget-builder';

export default function nested(desc) {
  const name = desc.get(kw('id'));
  const nested = desc.get(kw('nested'));
  const Widget = widgetBuilder(nested);

  return class extends React.PureComponent {
    static displayName = `Nested(${name})`

    handleChange(idx, value) {
      const data = this.props.data.slice();
      data[idx] = value;
      this.props.onChange(data);
    }

    render() {
      return (
        <div>
          nested
          {this.props.data.map((itemData, idx) => {
            const itemErrors = null; //TODO
            const itemHandleChange = bind(this.handleChange, this, idx);
            return (
              <Widget key={idx} //todo может неправильно
                      data={itemData}
                      onChange={itemHandleChange} />
            );
          })}
        </div>
      );
    }
  };
}