import { pure } from 'recompose';
import Header from './Header';
import Config from './Config';
import Gauges from './Gauges';
import Loading from './Loading';

const Main = pure(
  ({ local, remote }) => {
    const page = local.get('page');

    if (page === 'loading') return <Loading />;

    return <div style={{
      width: '100%',
      fontSize: '2vw Roboto',
      position: 'relative',
      overflow: 'hidden',
      overflowY: 'scroll',
      height: '100vh'
    }}>
      <Header local={local} />
      { page === 'config' && <Config local={local} /> }
      { page === 'gauges' && <Gauges local={local} remote={remote} /> }
    </div>;
  }
);

export default Main;
