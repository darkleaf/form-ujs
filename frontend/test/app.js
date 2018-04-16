import React from 'react';
import t from 'transit-js';
const kw = t.keyword;

import '../src/main';
import Base from '../src/base';
import widgetBuilder from '../src/widget-builder';

// const desc = t.map([
//   kw('id'), kw('submit'),
//   kw('widget'), kw('submit'),
//   kw('url'), "/foo/bar",
//   kw('method'), kw('post'),
//   kw('body'), t.map([
//     kw('id'), kw('data'),
//     kw('widget'), kw('group'),
//     kw('keys-map'), t.map([
//       kw('user/name'), "name",
//       kw('user/email'), "email",
//       kw('user/birthday'), "birthday",
//       kw('user/hobby'), "hobby",
//       kw('user/participations'), "participations"
//     ]),
//     kw('items-order'), [
//       kw('user/name'),
//       kw('user/email'),
//       kw('user/birthday'),
//       kw('user/hobby'),
//       kw('user/participations')
//     ],
//     kw('items'), t.map([
//       kw('user/name'), t.map([
//         kw('id'), kw('user/name'),
//         kw('widget'), kw('input')
//       ]),
//       kw('user/email'), t.map([
//         kw('id'), kw('user/email'),
//         kw('widget'), kw('input'),
//         kw('input'),  t.map([
//           kw('type'), kw('email')
//         ])
//       ]),
//       kw('user/birthday'), t.map([
//         kw('id'), kw('user/birthday'),
//         kw('widget'), kw('datetime-local'),
//       ]),
//       kw('user/hobby'), t.map([
//         kw('id'), kw('user/hobby'),
//         kw('widget'), kw('textarea'),
//       ]),
//       kw('user/participations'), t.map([
//         kw('id'), kw('user/participations'),
//         kw('widget'), kw('collection'),
//         kw('nested'), t.map([
//           kw('id'), kw('participation'),
//           kw('widget'), kw('group'),
//           kw('keys-map'), t.map([
//             kw('participation/name'), "name"
//           ]),
//           kw('items-order'), [
//             kw('participation/name')
//           ],
//           kw('items'), t.map([
//             kw('participation/name'), t.map([
//               kw('id'), kw('participation/name'),
//               kw('widget'), kw('input')
//             ])
//           ])
//         ])
//       ])
//     ])
//   ])
// ]);

// const initialData = t.map([
//   'name', "some name",
//   'email', "foo@bar",
//   'birthday', new Date(),
//   'hobby', "beer",
//   'participations', [
//     t.map([
//       'name', "foo"
//     ]),
//     t.map([
//       'name', "bar"
//     ])
//   ]
// ]);



// {:widget :submit, :url "", :method "", :nested
//  {:widget :group, :nested
//   [:email {:widget :string, :type :email}
//    :password {:widget :string, :type :password}]}}


const desc = t.map([
  kw('widget'), kw('submit'),
  kw('url'), "/foo/bar",
  kw('method'), kw('post'),
  kw('nested'), t.map([
    kw('widget'), kw('group'),
    kw('nested'), [
      ['name', t.map([
        kw('widget'), kw('input'),
        kw('label'), 'Name',
      ])],
      ['email', t.map([
        kw('widget'), kw('input'),
        kw('type'), 'email',
        kw('label'), 'Email',
      ])],
      ['password', t.map([
        kw('widget'), kw('input'),
        kw('type'), 'password',
        kw('label'), 'Password',
      ])],
      ['text', t.map([
        kw('widget'), kw('textarea'),
        kw('label'), 'Text',
      ])]
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



// [:submit {:url "", :method ""}
//  [:group {}
//   :email [:string {:type :email}]
//   :password [:string {:type :password}]]]


// {:widget :submit, :url "", :method "", :nested
//  {:widget :group, :nested
//   [:email {:widget :string, :type :email}
//    :password {:widget :string, :type :password}]}}
