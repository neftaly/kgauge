import React from 'react';
import { pure } from 'recompose';
import math from 'mathjs';
import R from 'ramda';
import defaults from './defaults';
import DigitalGauge from './DigitalGauge';
import format from 'format-number';

math.createUnit({
  'knots': {
    definition: '0.514444m/s',
    aliases: ['knot', 'kt', 'kts']
  },
  'time': {
    definition: '1 second'
  }
});

const Wrapper = pure(
  ({ width, height, type, x, y, ...props }) => <div style={{
    width: `calc(${width} * 20vw - 1px)`,
    height: `calc(${height} * 20vw - 1px)`,
    left: `calc(${x} * 20vw)`,
    top: `calc(${y} * 20vw)`,
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: 'silver'
  }} children={(() => {
    switch (type) {
      case 'digital':
      default:
        return <DigitalGauge {...{
          width,
          height,
          ...props
        }} />;
    }
  })()} />
);

const Gauge = pure(
  ({ value = NaN, units, options }) => {
    const path = options.get('path').toArray();
    const {
      unit: inUnit,
      outUnit = units.get(inUnit, inUnit),
      integer,
      fraction,
      parser = R.identity,
      serializer = R.identity,
      ...rest
    } = R.merge(
      R.path(path, defaults),
      options.toJS()
    );
    const result = R.tryCatch(
      R.compose(
        serializer,
        format({
          padLeft: integer,
          round: fraction,
          padRight: fraction,
          integerSeparator: ''
        }),
        v => v.toNumber(outUnit),
        v => math.unit(v, inUnit),
        parser
      ),
      R.always('ERR')
    )(value);
    return <Wrapper
      {...rest}
      value={result}
      units={outUnit}
    />;
  }
);

export default Gauge;
