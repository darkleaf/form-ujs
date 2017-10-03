import t from 'transit-js';
const kw = t.keyword;

import registry from './factories-registry';

export default function buildWidget(description) {
  const widgetId = description.get(kw('widget'));
  const factory = registry.get(widgetId);
  return factory(description);
}
