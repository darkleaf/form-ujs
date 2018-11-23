import React from 'react';
import ReactDOM from 'react-dom';

import t from 'transit-js';
const kw = t.keyword;

import './main';
import State from './state';
import widgetBuilder from './widget-builder';

const r = t.reader('json');

function makeRoot(form) {
  const root = document.createElement("div");
  document.body.insertBefore(root, form);
  return root;
}

function makeElement(data) {
  const description = data.get(kw('description'));
  const initialData = data.get(kw('initial-data'));
  const initialErrors = data.get(kw('errors'));

  const Form = widgetBuilder(description);

  return (
    <State widget={Form}
           initialData={initialData}
           initialErrors={initialErrors} />
  );
}

const formScripts = document.querySelectorAll('script[data-form-ujs]');

for (let f of formScripts) {
  const data = r.read( f.innerHTML );

  const element = makeElement(data);
  const root = makeRoot(f);

  ReactDOM.render(element, root);
}
