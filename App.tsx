import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/Routes';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SessionProvider from './src/context/SessionContext.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function App() {
  useEffect(() => {
    changeNavigationBarColor('white', true);
  }, []);

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
