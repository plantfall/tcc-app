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
        <Image
          source={require('../assets/images/sgw.webp')}
          style={{
            height: 100,
            width: 100,
          }}
        />

        <Text style={{fontSize: 20, fontWeight: '700'}}>App Venda IA</Text>
        <Text style={{fontSize: 15}}>Indentar Inc.</Text>
        <ActivityIndicator size={50} color={'blue'} style={{marginTop: 30}} />
      </View>
    );
  }

  return signed ? <Logged /> : <AuthRoutes />;
}
