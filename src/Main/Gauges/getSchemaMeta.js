import R from 'ramda';
import metadata from 'signalk-schema/keyswithmetadata.json';
import { fromJS } from 'immutable';

const metadataByRegex = R.compose(
  R.reject(
    R.compose(
      R.endsWith('.*$/'),
      String,
      R.prop(0)
    )
  ),
  R.map(
    R.over(
      R.lensIndex(0),
      R.compose(
        R.constructN(1, RegExp),
        exp => `^${exp}$`,
        R.replace(/RegExp/g, '.*'),
        R.replace(/\*/g, '.*')
      )
    )
  ),
  R.toPairs
)(metadata);

const getSchemaMeta = R.memoize(
  R.compose(
    fromJS,
    R.defaultTo({}),
    R.prop(1),
    path => R.find(
      ([ exp ]) => R.test(exp, path),
      metadataByRegex
    ),
    R.replace(/\./g, '/'),
    s => '/vessels/_/' + s,
    R.join('/')
  )
);

export default getSchemaMeta;
