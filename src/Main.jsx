import { pure } from 'recompose';
import R from 'ramda';
import Gauges from './Gauges';
import Config from './Config';

const Main = pure(
  ({ local, remote }) => {
    const page = local.get('page');

    return <div style={{
      width: '100%',
      fontSize: '2vw Roboto',
      position: 'relative',
      overflow: 'hidden',
      overflowY: 'scroll',
      height: '100vh'
    }}>
      <div>
        <select
          value={page}
          onChange={
            event => local.set('page', event.target.value)
          }
          children={
            R.map(
              name => <option children={name} />,
              [ 'gauges', 'config' ]
            )
          }
        />
        {' '}
        <b children={local.get('endpoint')} />
        {' '}
        <button
          onClick={
            event => {
              const oldEndpoint = local.get('endpoint');
              const endpoint = prompt('Endpoint address?', oldEndpoint);
              if (endpoint) local.set('endpoint', endpoint);
            }
          }
          children='connect'
        />
      </div>
      { page === 'config' && <Config local={local} /> }
      { page === 'gauges' && <Gauges local={local} remote={remote} /> }
    </div>;
  }
);

export default Main;
