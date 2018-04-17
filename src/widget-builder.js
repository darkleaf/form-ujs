import t from 'transit-js';
const kw = t.keyword;

import registry from './factories-registry';

export default function buildWidget(description) {
  const widget = description.get(kw('widget'));
  const factory = registry.get(widget);
  return factory(description);
}
