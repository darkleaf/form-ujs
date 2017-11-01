import React from 'react';
import ReactDOM from 'react-dom';

import t from 'transit-js';
import './main';
import State from './state';
import widgetBuilder from './widget-builder';

const forms = document.querySelectorAll('[data-form-ujs]');

for (var f of forms) {
  const r = t.reader('json');

  const name = f.dataset.formUjs;

  const descStr = document.getElementById(`${name}-description`).text;
  const dataStr = document.getElementById(`${name}-data`).text;
  const errorsStr = document.getElementById(`${name}-errors`).text;

  const desc = r.read(descStr);
  const data = r.read(dataStr);
  const errors = r.read(errorsStr);

  const Form = widgetBuilder(desc);

  ReactDOM.render(
    <State widget={Form}
           initialData={data}
           errors={errors} />,
    f
  );
}
