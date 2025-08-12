import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/Routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {ToastProvider} from 'react-native-toast-notifications';
import SessionProvider from './src/context/SessionContext.tsx';

export default function App() {
  useEffect(() => {
    changeNavigationBarColor('white', true);
  }, []);

  return (
    <NavigationContainer>
      <SessionProvider>
        <Routes />
      </SessionProvider>
      {/* <StackApp /> */}
    </NavigationContainer>
  );
}
