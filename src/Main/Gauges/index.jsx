import React from 'react';
import { pure } from 'recompose';
import math from 'mathjs';
import * as R from 'ramda';
import DigitalGauge from './DigitalGauge';
import format from 'format-number';
import { Map } from 'immutable';
import getSchemaMeta from './getSchemaMeta';
import memoizee from 'memoizee';

// Guess datum title from path
const guessTitle = memoizee(
  R.compose(
    R.toLower,
    R.join(' '),
    R.map(R.replace(/([A-Z])/g, ' $1')),
    R.tail
  )
);

math.createUnit({
  'knots': {
    definition: '0.514444m/s',
    aliases: ['knot', 'kt', 'kts']
  }
});

const Wrapper = pure(
  ({ type, x, y, ...props }) => <div style={{
    width: `calc(${props.width} * 20vw - 1px)`,
    height: `calc(${props.height} * 20vw - 1px)`,
    left: `calc(${x} * 20vw)`,
    top: `calc(${y} * 20vw)`,
    position: 'absolute',
    // backgroundColor: 'silver',
    overflow: 'hidden'
  }} children={(() => {
    switch (type) {
      case 'digital':
      default:
        return <DigitalGauge {...props} />;
    }
  })()} />
);

const Gauge = pure(
  ({
    state = new Map(),
    unitTypes,
    options
  }) => {
    const path = options.get('path');
    const {
      units, // inunit
      unit = unitTypes.get(units, units), // outunit
      integer,
      fraction = 2,
      parser = R.identity,
      serializer = R.identity,
      ...rest
    } = new Map({
      label: guessTitle(path),
      width: 1,
      height: 1
    }).merge(
      getSchemaMeta(path),
      state.get('meta'),
      options
    ).toJS();

    const result = R.tryCatch(
      R.compose(
        serializer,
        format({
          padLeft: integer,
          round: fraction,
          padRight: fraction,
          integerSeparator: ''
        }),
        v => v.toNumber(unit),
        v => math.unit(v, units),
        parser,
        R.defaultTo(NaN)
      ),
      R.always('ERR')
    )(
      state.get('value')
    );

    return <Wrapper
      {...rest}
      value={result}
      unit={unit}
      data-tip='React-tooltip'
    />;
  }
);

const Gauges = pure(
  ({ local, remote }) => {
    const vessel = remote.getIn(
      [ 'vessels', remote.get('self').replace('vessels.', '') ],
      new Map()
    );
    return <div
      style={{
        position: 'relative',
        width: '100%'
      }}
      children={
        local.get(
          'gauges'
        ).map(
          (gauge, key) => <Gauge
            key={key}
            options={gauge}
            unitTypes={local.get('unitTypes')}
            state={vessel.getIn(gauge.get('path'))}
          />
        )
      }
    />;
  }
);

export default Gauges;
