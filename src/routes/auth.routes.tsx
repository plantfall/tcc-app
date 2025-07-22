const Stack = createNativeStackNavigator();

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenLogin from '../screens/ScreenLogin/ScreenLogin';

export default function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ScreenLogin" component={ScreenLogin} />
    </Stack.Navigator>
  );
}
