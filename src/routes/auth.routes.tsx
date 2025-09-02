const Stack = createNativeStackNavigator();

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenLogin from '../screens/ScreenLogin/ScreenLogin';
import ScreenBoarding from '../screens/ScreenBoarding/ScreenBoarding';
import ScreenSignUp from '../screens/ScreenSignUp/ScreenSignUp';
import ScreenEsqueciMinhaSenha from '../screens/ScreenEsqueciMinhaSenha/ScreenEsqueciMinhaSenha';

export default function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="auth_stack" component={AuthStackNavigator} />
    </Stack.Navigator>
  );
}

function AuthStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Stack.Screen name="ScreenBoarding" component={ScreenBoarding} />
      <Stack.Screen
        name="ScreenEsqueciMinhaSenha"
        component={ScreenEsqueciMinhaSenha}
      />

      <Stack.Screen name="ScreenLogin" component={ScreenLogin} />

      <Stack.Screen name="ScreenSignUp" component={ScreenSignUp} />
    </Stack.Navigator>
  );
}
