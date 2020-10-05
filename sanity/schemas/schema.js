import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import pizza from './pizza';
import person from './person';
import topping from './topping';
import storeSettings from './storeSettings';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([pizza, topping, person, storeSettings]),
});
