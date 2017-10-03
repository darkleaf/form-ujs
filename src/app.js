/*
 * группа инпутов
 * вложенные
 * вложенные с добавлением/удалением
 * вложенные с перемещением
 * инпут
 * инпут с html типами
 * textarea
 * debunce inputs
 * radios as select
 * autosuggest
 * checkboxes as multiselect
 * tags select / multi autsuggest
 * single checkbox
 * инпут для целых чисел (шаг)
 * для чисел с точкой
 * для даты
 * для даты/времени
 * загрузка фалов/картинок
 */


import React from 'react';
import t from 'transit-js';
const kw = t.keyword;

import input from './factories/input';
import group from './factories/group';
import nested from './factories/nested';
import registry from './factories-registry';
import formBuilder from './form-builder';

registry.set(kw('input'), input);
registry.set(kw('group'), group);
registry.set(kw('nested'), nested);

const desc = t.map([
  kw('id'), kw('data'),
  kw('widget'), kw('group'),
  kw('items-order'), [
    kw('user/name'),
    kw('user/email'),
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
    kw('user/participations'), t.map([
      kw('id'), kw('user/participations'),
      kw('widget'), kw('nested'),
      kw('nested'), t.map([
        kw('id'), kw('participation'),
        kw('widget'), kw('group'),
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
]);

const initialData = t.map([
  kw('user/name'), "some name",
  kw('user/email'), "foo@bar",

  kw('user/participations'), [
    t.map([
      kw('participation/name'), "foo"
    ]),
    t.map([
      kw('participation/name'), "bar"
    ])
  ]
]);

const Form = formBuilder(desc, initialData);

export default function App() {
  return (
    <div className="container">
      <Form />
    </div>
  );
}
