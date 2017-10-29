import t from 'transit-js';
const kw = t.keyword;

import Submit from './factories/submit';
import Input from './factories/input';
import Textarea from './factories/textarea';
import Group from './factories/group';
import Collection from './factories/collection';
import DatetimeLocal from './factories/datetime-local';

import registry from './factories-registry';

registry.set(kw('submit'), Submit);
registry.set(kw('input'), Input);
registry.set(kw('textarea'), Textarea);
registry.set(kw('group'), Group);
registry.set(kw('collection'), Collection);
registry.set(kw('datetime-local'), DatetimeLocal);
