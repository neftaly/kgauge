import { pure } from 'recompose';
import Header from './Header';
import Config from './Config';
import Gauges from './Gauges';
import Loading from './Loading';
import { View } from 'react-native';

const Main = pure(
  ({ local, remote }) => {
    const page = local.get('page');

    if (page === 'loading') return <Loading />;

    return <View>
      <Header local={local} />
      { page === 'config' && <Config local={local} /> }
      { page === 'gauges' && <Gauges local={local} remote={remote} /> }
    </View>;
  }
);

export default Main;
