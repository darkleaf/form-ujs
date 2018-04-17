import t from 'transit-js';
const kw = t.keyword;

import registry from './factories-registry';

import Submit from './factories/submit';
registry.set(kw('submit'), Submit);

import Input from './factories/input';
registry.set(kw('input'), Input);

import Group from './factories/group';
registry.set(kw('group'), Group);

import Textarea from './factories/textarea';
registry.set(kw('textarea'), Textarea);

import Flatpickr from './factories/flatpickr';
registry.set(kw('flatpickr'), Flatpickr);

// import Collection from './factories/collection';
// registry.set(kw('collection'), Collection);
