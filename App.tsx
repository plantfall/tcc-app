import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/Routes';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SessionProvider from './src/context/SessionContext.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ConsultaService} from './src/service/ConsultaService.ts';
import {PermissionsAndroid, Platform} from 'react-native';

export default function App() {
  useEffect(() => {
    changeNavigationBarColor('white', true);

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
          const consultaService = new ConsultaService();
          consultaService.notificarProximasConsultas();

          // iniciar serviço de background
          //await BackgroundNotificationService.startBackgroundService();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      const consultaService = new ConsultaService();

      // iniciar serviço de background
      //await BackgroundNotificationService.startBackgroundService();
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
