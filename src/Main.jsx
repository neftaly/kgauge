import { pure } from 'recompose';
import Gauge from './Gauge';
import { Map } from 'immutable';

const Main = pure(
  ({ local, remote }) => {
    const vessel = remote.getIn(
      [ 'vessels', remote.get('self') ],
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
            unitTypes={local.get('unitTypes')}
            state={vessel.getIn(gauge.get('path'))}
          />
        )
      } />
    </div>;
  }
);

export default Main;
