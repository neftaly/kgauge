import { pure } from 'recompose';
import R from 'ramda';

const Header = pure(
  ({ local }) => <div>
    <select
      value={local.get('page')}
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
);

export default Header;
