import React from 'react';
import ReactDOM from 'react-dom';

import t from 'transit-js';
const kw = t.keyword;

import './main';
import State from './state';
import widgetBuilder from './widget-builder';

const r = t.reader('json');

function makeElement(data) {
  const description = data.get(kw('description'));
  const initialData = data.get(kw('initial-data'));
  const initialErrors = data.get(kw('initial-errors'));

  const Form = widgetBuilder(description);

  return (
    <State widget={Form}
           initialData={initialData}
           initialErrors={initialErrors} />
  );
}

const forms = document.querySelectorAll('[data-form-ujs]');

for (let f of forms) {
  const data = r.read( f.dataset.formUjs );
  const element = makeElement(data);

  ReactDOM.render(element, f);
}
