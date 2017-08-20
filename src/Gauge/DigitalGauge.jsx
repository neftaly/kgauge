import { pure } from 'recompose';
import R from 'ramda';

const color = (low, value, high) => {
  if (low && value <= low) return 'orange';
  if (high && value >= high) return 'red';
  if (low || high) return 'green';
  return 'black';
};

const largestFont = R.memoize(
  (width, height, length) => {
    const size = 3 / 5 * Math.max(
      height >= width ? 1 : width * 3,
      length
    );
    return `calc((${width} * 20vw - 2px) / ${size})`;
  }
);

const DigitalGauge = pure(
  ({
    width,
    height,
    title,
    value,
    units,
    low,
    high
  }) => <div style={{
    height: '100%',
    position: 'relative'
  }}>
    <div style={{
      position: 'absolute',
      width: '100%',
      top: '0',
      padding: '0.5vw',
      textAlign: 'center',
      opacity: 0.5
    }} children={title} />
    <div style={{
      color: color(low, Number(value), high),
      fontFamily: `'Roboto Mono'`,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      textShadow: '0px 0px 1px silver',
      fontSize: largestFont(width, height, String(value).length)
    }} children={value} />
    <div style={{
      position: 'absolute',
      padding: '0.5vw',
      bottom: '0',
      right: '0',
      opacity: 0.5
    }} children={units} />
  </div>
);

export default DigitalGauge;
