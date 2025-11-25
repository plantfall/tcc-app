import React, {useEffect} from 'react';
import {
  NativeModules,
  PermissionsAndroid,
  Platform,
  StatusBar,
} from 'react-native';
import {ThemeProvider, useTheme} from './src/context/ThemeContext.tsx';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SessionProvider from './src/context/SessionContext.tsx';
import Routes from './src/routes/Routes.tsx';

const {BarraDeNavegacao} = NativeModules;

function RootContent() {
  const {theme} = useTheme();

  return (
    // Use a cor de fundo do tema na SafeAreaView
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      {/* Defina a cor de fundo da StatusBar e o estilo do texto com base no tema */}
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Routes />

      {/* <ScreenConsultaAgendada /> */}
    </SafeAreaView>
  );
}

export default function App() {
  useEffect(() => {
    const fundoClaroBotoesEscuros = true;
    BarraDeNavegacao.setNavigationBarButtonsColor(fundoClaroBotoesEscuros);

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
    // 1. Envolva tudo com o ThemeProvider
    <ThemeProvider>
      <NavigationContainer>
        <SessionProvider>
          {/* 2. Use o novo componente que consome o tema */}
          <RootContent />
        </SessionProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
