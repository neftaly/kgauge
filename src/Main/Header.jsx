import { pure } from 'recompose';
import { Map } from 'immutable';
import {
  Text,
  View,
  Button,
  Picker
} from 'react-native';

const Header = pure(
  ({ local }) => <View>
    <Picker
      selectedValue={local.get('page')}
      onValueChange={value => local.set('page', value)}
    >
      <option label='Gauges' value='gauges' />
      <option label='Config' value='config' />
    </Picker>
    <Text children={local.get('endpoint')} />
    <View style={{ width: 100 }}>
      <Button
        onPress={
          event => local.updateIn(
            [ 'dialogs', 'connect' ],
            new Map(),
            connect => connect.set(
              'visible', true
            ).set(
              'endpoint', local.get('endpoint')
            )
          )
        }
        title='connect'
      />
    </View>
  </View>
);

export default Header;
