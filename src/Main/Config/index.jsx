import { pure } from 'recompose';
import Units from './Units';
import Gauges from './Gauges';

const Config = pure(
  ({ local }) => <div>
    <Units unitTypes={local.cursor('unitTypes')} />
    <Gauges gauges={local.cursor('gauges')} />
  </div>
);

export default Config;
