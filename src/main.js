import t from 'transit-js';
const kw = t.keyword;

import Submit from './factories/submit';
import Input from './factories/input';
import Group from './factories/group';
import Nested from './factories/nested';
import DatetimeLocal from './factories/datetime-local';

import registry from './factories-registry';

registry.set(kw('submit'), Submit);
registry.set(kw('input'), Input);
registry.set(kw('group'), Group);
registry.set(kw('nested'), Nested);
registry.set(kw('datetime-local'), DatetimeLocal);
