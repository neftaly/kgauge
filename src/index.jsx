import 'normalize.css';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import immstruct from 'immstruct';
import kumara from 'kumara';

const remote = immstruct({});

const local = immstruct({
  endpoint: 'http://demo.signalk.org/signalk',
  unitTypes: {
    'K': 'celsius',
    'Pa': 'mPa',
    'm': 'meters',
    'm/s': 'knots',
    'm/s2': 'm/s2',
    'm2': 'm2',
    'm3': 'liters',
    'm3/s': 'l/s',
    'N': 'N',
    'kg': 'kg',
    'rad': 'deg',
    'rad/s': 'deg/s',
    'rad/s2': 'deg/s2'
  },
  gauges: [
    {
      path: ['navigation', 'speedOverGround'],
      title: 'Speed over ground',
      x: 0,
      y: 0
    },
    {
      path: ['navigation', 'courseOverGroundTrue'],
      x: 1,
      y: 0
    },
    {
      path: ['navigation', 'magneticVariation'],
      x: 2,
      y: 0
    },
    {
      path: ['navigation', 'headingTrue'],
      x: 0,
      y: 1
    },
    {
      path: ['navigation', 'speedThroughWater'],
      x: 1,
      y: 1
    },
    {
      path: ['electrical', 'batteries', '1', 'voltage'],
      x: 2,
      y: 1
    },
    {
      path: ['electrical', 'batteries', '1', 'current'],
      x: 0,
      y: 2
    },
    {
      path: ['electrical', 'batteries', '1', 'temperature'],
      x: 1,
      y: 2,
      units: 'K'
    },
    {
      path: ['environment', 'depth', 'belowKeel'],
      x: 3,
      y: 2,
      width: 2
    },
    {
      path: ['environment', 'water', 'temperature'],
      x: 2,
      y: 2
    },
    {
      path: ['environment', 'wind', 'speedApparent'],
      x: 0,
      y: 3
    },
    {
      path: ['environment', 'wind', 'angleApparent'],
      x: 3,
      y: 0,
      width: 2,
      height: 2
    }
  ]
});

const render = () => {
  const Component = require('./Main').default;
  ReactDOM.render(
    <AppContainer children={
      <Component
        local={local.cursor()}
        remote={remote.cursor()}
      />
    } />,
    document.getElementById('root')
  );
};

local.on('swap', render);
remote.on('swap', (...args) => !window.x && render(...args));

if (module.hot) {
  module.hot.accept('./Main', render);
}

render();

// Connect to endpoint, and reconnect whenever endpoint changes
let connection;
const connect = endpoint => {
  if (connection) connection.end(true);
  if (!endpoint) return;
  connection = kumara(
    endpoint
  ).map(
    state => remote.cursor().set(state)
  );
};
local.reference('endpoint').observe(connect);
connect(local.cursor('endpoint').valueOf());
