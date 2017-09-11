import 'normalize.css';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import kumara from 'kumara';
import { remote, local } from './state';

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

const render = () => {
  const Component = require('./Main').default;
  ReactDOM.render(
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
