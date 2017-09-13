import { AppContainer } from 'react-hot-loader';
import { remote, local } from './state';
import ReactNative from 'react-native';

const render = () => {
  const Component = require('./Main').default;
  ReactNative.render(
    <AppContainer children={
      <Component
        local={local.cursor()}
        remote={remote.cursor()}
      />
    } />,
    document.getElementById('root')
  );
};

render();
local.on('swap', render);
remote.on('next-animation-frame', render);
if (module.hot) module.hot.accept('./Main', render);
