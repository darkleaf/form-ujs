import React from 'react';
import bind from 'memoize-bind';
import t from 'transit-js';
const kw = t.keyword;

import widgetBuilder from '../widget-builder';

export default function Group(desc) {
  const name = desc.get(kw('id'));
  const itemsOrder = desc.get(kw('items-order'));
  const items = desc.get(kw('items'));
  const widgets = itemsOrder.map(item => {
    const desc = items.get(item);
    return widgetBuilder(desc);
  });

  return class extends React.PureComponent {
    static displayName = `Group(${name})`

    onChange(key, value) {
      const data = this.props.data.clone();
      data.set(key, value);
      this.props.onChange(data);
    }

    render() {
      const {data, errors, onChange} = this.props;
      return (
        itemsOrder.map((key, idx) => {
          const Widget = widgets[idx];
          const wData = data.get(key);
          const wErrors = null; //TODO
          const wOnChage = bind(this.onChange, this, key);

          return (
            <Widget key={key}
                    data={wData}
                    errors={wErrors}
                    onChange={wOnChage} />
          );
        })
      );
    }
  };
}
