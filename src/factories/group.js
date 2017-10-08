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
  const keysMap = desc.get(kw('keys-map'));
  const defaultData = t.map();

  return class extends React.PureComponent {
    static displayName = `Group(${name})`

    data() {
      return this.props.data || defaultData;
    }

    onChange(key, value) {
      const data = this.data().clone();
      data.set(key, value);
      this.props.onChange(data);
    }

    render() {
      const {data, errors, onChange} = this.props;
      return (
        itemsOrder.map((id, idx) => {
          const Widget = widgets[idx];
          const key = keysMap.get(id);
          const wData = this.data().get(key);
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
