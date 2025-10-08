import {PermissionsAndroid, Platform} from 'react-native';
import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import SessionProvider from './src/context/SessionContext.tsx';

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
          <Routes />
        </SafeAreaView>
      </SessionProvider>
    </NavigationContainer>
  );
}
