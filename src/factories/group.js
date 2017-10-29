import React from 'react';
import bind from 'memoize-bind';
import t from 'transit-js';
const kw = t.keyword;

import widgetBuilder from '../widget-builder';

export default function Group(desc) {
  const widgetId = desc.get(kw('id'));
  const itemsOrder = desc.get(kw('items-order'));
  const items = desc.get(kw('items'));
  const widgets = itemsOrder.map(item => {
    const desc = items.get(item);
    return widgetBuilder(desc);
  });
  const keysMap = desc.get(kw('keys-map'));

  return class extends React.PureComponent {
    static displayName = `Group(${widgetId})`;
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
      const ownErrors = this.props.errors.get(kw('form-ujs/errors')) || [];

      return (
        <div className="mt-3" data-widget-id={widgetId} >
          <div>
            {ownErrors.map((error, idx) => {
              return <div key={idx} className="alert alert-danger">{error}</div>;
            })}
          </div>
          <div>
            {itemsOrder.map((id, idx) => {
              const Widget = widgets[idx];
              const key = keysMap.get(id);
              const wData = this.props.data.get(key);
              const wErrors = this.props.errors.get(key);
              const wOnChage = bind(this.onChange, this, key);
              return  <Widget
                          key={key}
                          data={wData}
                          errors={wErrors}
                          onChange={wOnChage} />;
            })}
          </div>
        </div>
      );
    }
  };
}
