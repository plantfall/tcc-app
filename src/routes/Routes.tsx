import {useContext} from 'react';
import AuthRoutes from './auth.routes';
import Logged from './app.routes';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import {SessionContext} from '../context/SessionContext';

export default function Routes() {
  const {signed, loading} = useContext(SessionContext);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: 50,
          backgroundColor: '#fff',
        }}>
        <Text style={{fontSize: 20, fontWeight: '700'}}>App TCC</Text>

        <ActivityIndicator size={50} color={'blue'} style={{marginTop: 30}} />
      </View>
    );
  }

  return signed ? <Logged /> : <AuthRoutes />;
}
