import { pure } from 'recompose';
import Gauge from './Gauge';
import { Map } from 'immutable';

const Main = pure(
  ({ local, remote }) => {
    const vessel = remote.getIn(
      [ 'vessels', remote.getIn(['server', 'self']) ],
      new Map()
    );

    return <div>
      <div style={{
        width: '100%',
        font: `2vw Roboto`,
        position: 'relative',
        overflow: 'hidden',
        overflowY: 'scroll',
        height: '100vh'
      }} children={
        local.get(
          'gauges'
        ).map(
          (gauge, key) => <Gauge
            key={key}
            options={gauge}
            units={local.get('units')}
            value={vessel.getIn(gauge.get('path'))}
          />
        )
      } />
    </div>;
  }
);

export default Main;
