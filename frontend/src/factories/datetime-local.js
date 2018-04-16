// import React from 'react';
// import bind from 'memoize-bind';
// import fecha from 'fecha';
// import t from 'transit-js';
// const kw = t.keyword;
// import generateId from '../generate-id';

// const format = 'YYYY-MM-DDTHH:mm';

// function isStrBlank(str) {
//   if (str === null) return true;
//   if (str === undefined) return true;
//   if (str === '') return true;
//   return false;
// }

// function strToFecha(str) {
//   if (isStrBlank(str)) return undefined;
//   return fecha.parse(str, format);
// }

// function dateToStr(date) {
//   if (!(date instanceof Date)) return "";
//   return fecha.format(date, format);
// }

// export default function DatetimeLocal(desc) {
//   const widgetId = desc.get(kw('id'));
//   return class extends React.PureComponent {
//     static displayName = `DatetimeLocal(${widgetId})`;

//     constructor(props) {
//       super(props);
//       this.id = generateId();
//     }

//     //todo: для safari и прочих нужна своя реализация,
//     //т.к. событие будет приходить как от обычного инпута
//     onChange(e) {
//       const value = strToFecha(e.target.value);

//       //value может быть false, если не распарсилось

//       this.props.onChange(value);
//     }

//     render() {
//       return (
//         <div className="form-group"
//              data-widget-id={widgetId} >
//           <label htmlFor={this.id}>{widgetId.toString()}</label>
//           <input id={this.id}
//                  className="form-control"
//                  type="datetime-local"
//                  value={dateToStr(this.props.data)}
//                  onChange={bind(this.onChange, this)} />
//         </div>
//       );
//     }
//   };
// }
