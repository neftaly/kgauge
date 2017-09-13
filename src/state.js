import R from 'ramda';
import immstruct from 'immstruct';
import { fromJS } from 'immutable';
import localforage from 'localforage';
import kumara from 'kumara';

const storageKey = 'kgauge.2017-09-12';

const initial = {
  page: 'gauges',
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
  dialogs: {
    connect: {
      visible: false,
      endpoint: undefined
    }
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
};

const local = immstruct({ page: 'loading' });

localforage.getItem(
  storageKey,
  R.compose(
    s => local.cursor().set(s),
    fromJS,
    R.defaultTo(initial)
  )
);

local.on(
  'next-animation-frame',
  s => localforage.setItem(storageKey, s)
);

// Connect whenever endpoint changes
let connection;
local.reference(
  'endpoint'
).observe(
  endpoint => {
    if (connection) connection.end(true);
    if (!endpoint) return;
    connection = kumara(
      endpoint
    ).map(
      s => remote.cursor().set(s)
    );
  }
);

const remote = immstruct({});

export {
  local,
  remote
};
