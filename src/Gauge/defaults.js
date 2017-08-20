module.exports = {
  navigation: {
    speedOverGround: {
      type: 'radial',
      height: 1,
      width: 1,
      title: 'SOG',
      unit: 'm/s',
      min: 0,
      max: 15,
      integer: 3,
      fraction: 1
    },
    courseOverGroundTrue: {
      type: 'compass',
      height: 1,
      width: 1,
      title: 'COG',
      unit: 'rad',
      fraction: 1
    },
    magneticVariation: {
      type: 'radial',
      height: 1,
      width: 1,
      title: 'Magnetic variation',
      unit: 'rad'
    },
    headingTrue: {
      type: 'compass',
      height: 1,
      width: 1,
      title: 'True heading',
      unit: 'rad'
    },
    speedThroughWater: {
      type: 'radial',
      height: 1,
      width: 1,
      title: 'Speed through water',
      unit: 'm/s',
      min: 0,
      max: 15
    },
    datetime: {
      type: 'digital',
      height: 1,
      width: 2,
      title: 'Date',
      unit: 'time',
      parser: d => typeof d !== 'string' ? NaN : Number(new Date(d)),
      serializer: d => isNaN(d) ? NaN : new Date(Number(d)).toISOString()
    }
  },
  electrical: {
    batteries: {
      1: {
        voltage: {
          type: 'radial',
          height: 1,
          width: 1,
          title: '🔋#1 Voltage',
          min: 10,
          max: 15,
          unit: 'volts'
        },
        current: {
          type: 'radial',
          height: 1,
          width: 1,
          title: '🔋#1 Current',
          min: 500,
          max: 500,
          unit: 'amperes'
        },
        temperature: {
          type: 'radial',
          height: 1,
          width: 1,
          title: '🔋#1 Temp',
          unit: 'kelvin',
          min: 255,
          max: 355,
          low: 270,
          high: 320
        }
      }
    }
  },
  environment: {
    depth: {
      belowKeel: {
        type: 'digital',
        height: 1,
        width: 1,
        title: 'Depth',
        unit: 'meters',
        low: 2,
        integer: 3,
        fraction: 1
      }
    },
    water: {
      temperature: {
        type: 'digital',
        height: 1,
        width: 1,
        title: 'Water temp',
        unit: 'kelvin',
        min: 240,
        max: 340,
        fraction: 1
      }
    },
    wind: {
      speedApparent: {
        type: 'digital',
        height: 1,
        width: 1,
        title: 'Apparent wind',
        unit: 'm/s',
        fraction: 1
      },
      angleApparent: {
        type: 'compass',
        height: 1,
        width: 1,
        title: 'Apparent wind',
        unit: 'rad'
      }
    }
  }
};
