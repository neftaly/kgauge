import { pure } from 'recompose';
import * as R from 'ramda';

const units = {
  'K': {
    title: 'Temperature',
    options: [ 'celsius', 'fahrenheit' ]
  },
  'Pa': {
    title: 'Pressure',
    options: [ 'kPa', 'psi' ]
  },
  'm': {
    title: 'Distance',
    options: [ 'meters', 'feet' ]
  },
  'm/s': {
    title: 'Speed',
    options: [ 'm/s', 'knots', 'mph' ]
  },
  'm/s2': {
    title: 'Acceleration',
    options: [ 'm/s2', 'knots/s', 'mph/2' ]
  },
  'm2': {
    title: 'Surface area',
    options: [ 'm2', 'feet2' ]
  },
  'm3': {
    title: 'Volume',
    options: [ 'liters', 'gallons' ]
  },
  'm3/s': {
    title: 'Flow',
    options: [ 'l/s', 'gallons/s' ]
  },
  'N': {
    title: 'Force',
    options: [ 'N' ]
  },
  'kg': {
    title: 'Weight',
    options: [ 'kg', 'pounds' ]
  },
  'rad': {
    title: 'Angle',
    options: [ 'deg' ]
  },
  'rad/s': {
    title: 'Angular speed',
    options: [ 'deg/s' ]
  },
  'rad/s2': {
    title: 'Angular acceleration',
    options: [ 'deg/s2' ]
  }
};

const Units = pure(
  ({ unitTypes }) => <div>
    <h3 children='Units' />
    <div children={
      unitTypes.map(
        (value, key) => <div key={key}>
          <div
            style={{
              minWidth: '12em',
              marginRight: '1em',
              display: 'inline-block'
            }}
            children={units[key].title}
          />
          <select
            value={value}
            onChange={
              event => unitTypes.set(key, event.target.value)
            }
            children={
              R.map(
                value => <option children={value} />,
                units[key].options
              )
            }
          />
        </div>
      ).values()
    } />
  </div>
);

export default Units;
