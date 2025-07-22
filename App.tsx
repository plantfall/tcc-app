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
    <ToastProvider
      placement="bottom"
      offsetBottom={120}
      duration={5000}
      style={{borderRadius: 20}}
      textStyle={{flexWrap: 'wrap', textAlign: 'center', width: '80%'}}>
      <SafeAreaProvider style={{backgroundColor: '#fff'}}>
        <NavigationContainer>
          <SessionProvider>
            <Routes />
          </SessionProvider>
          {/* <StackApp /> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </ToastProvider>
  );
}
