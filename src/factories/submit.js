import React from 'react';
import bind from 'memoize-bind';
import t from 'transit-js';
const kw = t.keyword;

import widgetBuilder from '../widget-builder';

export default function Submit(desc) {
  const id = desc.get(kw('id'));
  const body = desc.get(kw('body'));
  const Body = widgetBuilder(body);

  return class extends React.Component {
    static displayName = `Submit(${id})`

    constructor(props) {
      super(props);

      // должен быть стейт, когда нажали submit,
      // то форма должна блокироваться и кнопка тоже
      // просто не пускать наверх onChange
    }

    render() {
      return (
        <div>
          <Body data={this.props.data}
                errors={this.props.errors}
                onChange={this.props.onChange}
                setErrors={this.props.setErrros} />
          <div>submit</div>
        </div>
      );
    }
  };
}
