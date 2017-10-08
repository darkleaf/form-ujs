import React from 'react';
import t from 'transit-js';
const kw = t.keyword;

import '../src/main';
import State from '../src/state';
import widgetBuilder from '../src/widget-builder';

const desc = t.map([
  kw('id'), kw('submit'),
  kw('widget'), kw('submit'),
  kw('url'), "/foo/bar",
  kw('mentod'), kw('post'),
  kw('body'), t.map([
    kw('id'), kw('data'),
    kw('widget'), kw('group'),
    kw('keys-map'), t.map([
      kw('user/name'), "name",
      kw('user/email'), "email",
      kw('user/birthday'), "birthday",
      kw('user/participations'), "participations"
    ]),
    kw('items-order'), [
      kw('user/name'),
      kw('user/email'),
      kw('user/birthday'),
      kw('user/participations')
    ],
    kw('items'), t.map([
      kw('user/name'), t.map([
        kw('id'), kw('user/name'),
        kw('widget'), kw('input')
      ]),
      kw('user/email'), t.map([
        kw('id'), kw('user/email'),
        kw('widget'), kw('input'),
        kw('input'),  t.map([
          kw('type'), kw('email')
        ])
      ]),
      kw('user/birthday'), t.map([
        kw('id'), kw('user/birthday'),
        kw('widget'), kw('datetime-local'),
      ]),
      kw('user/participations'), t.map([
        kw('id'), kw('user/participations'),
        kw('widget'), kw('nested'),
        kw('nested'), t.map([
          kw('id'), kw('participation'),
          kw('widget'), kw('group'),
          kw('keys-map'), t.map([
            kw('participation/name'), "name"
          ]),
          kw('items-order'), [
            kw('participation/name')
          ],
          kw('items'), t.map([
            kw('participation/name'), t.map([
              kw('id'), kw('participation/name'),
              kw('widget'), kw('input')
            ])
          ])
        ])
      ])
    ])
  ])
]);

const initialData = t.map([
  'name', "some name",
  'email', "foo@bar",
  'birthday', new Date(),

  'participations', [
    t.map([
      'name', "foo"
    ]),
    t.map([
      'name', "bar"
    ])
  ]
]);

const Form = widgetBuilder(desc);

export default function App() {
  return (
    <div className="container">
      <State widget={Form}
             initialData={initialData}
             errors={null} />
    </div>
  );
}
