import React from 'react';
import t from 'transit-js';
const kw = t.keyword;

import '../src/main';
import Base from '../src/base';
import widgetBuilder from '../src/widget-builder';

const desc = t.map([
  kw('widget'), kw('submit'),
  kw('url'), "/foo/bar",
  kw('method'), kw('post'),
  kw('nested'), t.map([
    kw('widget'), kw('group'),
    kw('nested'), [
      'name', t.map([
        kw('widget'), kw('input'),
        kw('label'), 'Name',
      ]),
      'email', t.map([
        kw('widget'), kw('input'),
        kw('type'), 'email',
        kw('label'), 'Email',
      ]),
      'password', t.map([
        kw('widget'), kw('input'),
        kw('type'), 'password',
        kw('label'), 'Password',
      ]),
      'text', t.map([
        kw('widget'), kw('textarea'),
        kw('label'), 'Text',
      ]),
      'publishedAt', t.map([
        kw('widget'), kw('flatpickr'),
        kw('label'), 'Published at',
        kw('options'), JSON.stringify({
          locale: 'ru',
          enableTime: true,
          time_24hr: true
        }),
      ])
    ]
  ])
]);

const initialData = t.map([
  'email', "foo@bar",
  'password', "foo-bar",
  'text', "lorem ipsum"
]);

const errors = t.map([
  kw('form-ujs/error'), 'error',
  'name', t.map([
    kw('form-ujs/error'), 'error',
  ]),
  'email', t.map([
    kw('form-ujs/error'), 'error',
  ]),
  'password', t.map([
    kw('form-ujs/error'), 'error',
  ]),
  'text', t.map([
    kw('form-ujs/error'), 'error',
  ]),
  'publishedAt', t.map([
    kw('form-ujs/error'), 'error',
  ]),
]);

const Form = widgetBuilder(desc);

export default function App() {
  return (
    <div>
      <Base widget={Form}
            initialData={initialData} />

      <Base widget={Form}
            initialData={initialData}
            initialErrors={errors} />
    </div>
  );
}
