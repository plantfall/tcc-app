import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SessionProvider from './src/context/SessionContext.tsx';
import Routes from './src/routes/Routes';

export default function App() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Permissão de Notificações',
            message: 'O app precisa de permissão para mostrar notificações',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permissão concedida');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      console.log('Permissão concedida');
    }
  };

  return (
    <NavigationContainer>
      <SessionProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <StatusBar backgroundColor={'#000'} barStyle={'dark-content'} />
          <Routes />
        </SafeAreaView>
      </SessionProvider>
    </NavigationContainer>
  );
}
