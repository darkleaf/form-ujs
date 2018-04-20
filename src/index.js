import React from 'react';
import ReactDOM from 'react-dom';

import t from 'transit-js';
const kw = t.keyword;

import './main';
import State from './state';
import widgetBuilder from './widget-builder';

const forms = document.querySelectorAll('[data-form-ujs]');

for (var f of forms) {
  const r = t.reader('json');

  const raw = f.dataset.formUjs;
  const form = r.read(raw);

  const description = form.get(kw('description'));
  const initialData = form.get(kw('initial-data'));
  const errors = form.get(kw('errors'));

  const Form = widgetBuilder(description);

  ReactDOM.render(
    <State widget={Form}
           initialData={initialData}
           errors={errors} />,
    f
  );
}
