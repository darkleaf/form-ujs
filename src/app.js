/*
1. текстовая строка
2. textarea
3. select обычный
4. select автокомплит
5. select множественный
5. select множественный автокомплит
6. булев чекбокс
7. селект как радиобаттоны
8. селект как чекбоксы
9. загрузка файлов аяксом и установка урла
10. загрузкаа картинок
11. ввод целых чисел
12. ввод чисел с точкой
13. ввод цвета
14. выбор даты
15. выбор даты-времени
16. выбор времени - может быть нужно будет для транзита делать новый тип
17. выбор интервала дат ??

интренационализация должна быть в приложении, т.е. в схеме.

*/

import React from 'react';
import ReactDOM from 'react-dom';
import t from 'transit-js';
const kw = t.keyword;

const desc = t.map([
  kw('id'), kw('app/user-data'),
  kw('widget'), kw('group'),
  kw('items-order'), [
    kw('auth'),
    kw('other')
  ],
  kw('items'), t.map([
    kw('auth'), t.map([
      kw('id'), kw('auth'),
      kw('widget'), kw('group'),
      kw('items-order'), [
        kw('app/name'),
        kw('app/email')
      ],
      kw('items'), t.map([
        kw('app/name'), t.map([
          kw('id'), kw('app/name'),
          kw('widget'), kw('input')
        ]),
        kw('app/email'), t.map([
          kw('id'), kw('app/email'),
          kw('widget'), kw('input'),
          kw('input'),  t.map([
            kw('type'), kw('email')
          ])
        ])
      ])
    ]),
    kw('other'), t.map([
      kw('id'), kw('other'),
      kw('widget'), kw('group'),
      kw('items-order'), [
        kw('app/foo')
      ],
      kw('items'), t.map([
        kw('app/foo'), t.map([
          kw('id'), kw('app/foo'),
          kw('widget'), kw('input')
        ])
      ])
    ])
  ])
]);



function inputCF(desc) {
  const name = desc.get(kw('id'));
  return class extends React.PureComponent {
    static displayName = `Input(${name})`
    render() {
      const {data, onChange} = this.props;
      const handleChange = e => onChange(e.target.value);
      return <input value={data} onChange={handleChange} />;
    }
  };
}

function groupCF(desc) {
  const name = desc.get(kw('id')).name();
  const itemsOrder = desc.get(kw('items-order'));
  const items = desc.get(kw('items'));
  const widgets = itemsOrder.map((item) => {
    const desc = items.get(item);
    return buildWidget(desc);
  });

  return class extends React.PureComponent {
    static displayName = `Group(${name})`
    render() {
      const {data, errors, onChange} = this.props;
      return (
        <div>
          {itemsOrder.map((key, idx) => {
            const W = widgets[idx];
            const wData = data.get(key);
            const wOnChange = value => {
              //хреновый подход
              //нужно путь передавать,
              //т.к. если shoulComponentUpdate,
              //то в ветках будут старые данные
              //хотя нужно тестить
              const newData = data.clone();
              newData.set(key, value);
              onChange(newData);
            };
            const wErrors = null; //TODO

            return <W key={key} data={wData} errors={wErrors} onChange={wOnChange} />;
          })}
        </div>
      );
    }
  };
}

const cfRegistry = t.map([
  kw('input'), inputCF,
  kw('group'), groupCF
]);

function buildWidget(description) {
  const widgetId = description.get(kw('widget'));
  const cf = cfRegistry.get(widgetId);
  return cf(description);
}

function buildForm(desc, initialData, initialErrors) {
  const Widget = buildWidget(desc);

  return class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: initialData,
        errors: initialErrors
      };
    }

    handleChange = (data) => {
      this.setState({data});
    }

    render() {
      return (
        <Widget data={this.state.data}
                errors={this.state.errors}
                onChange={this.handleChange} />
      );
    }
  };
}

const initialData = t.map([
  kw('auth'), t.map([
    kw('app/name'), "some name",
    kw('app/email'), "foo@bar"
  ]),
  kw('other'), t.map([
    kw('app/foo'), "foo"
  ])
]);

export default buildForm(desc, initialData);
