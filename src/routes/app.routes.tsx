import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import ScreenConfirmacao from '../screens/ScreenAgendarConsulta/ScreenAgendarConsulta';
import ScreenAgendarConsulta from '../screens/ScreenAgendarConsulta/ScreenAgendarConsulta';
import ScreenFinalizarAgendamento from '../screens/ScreenFinalizarAgendamento/ScreenFinalizarAgendamento';
import ScreenHistoricoConsultas from '../screens/ScreenHistoricoConsultas/ScreenHistoricoConsultas';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="main_stack" component={HomeStackNavigator} />
    </Stack.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ScreenAgendarConsulta"
        component={ScreenAgendarConsulta}
      />
      <Stack.Screen
        name="ScreenFinalizarAgendamento"
        component={ScreenFinalizarAgendamento}
      />
      <Stack.Screen
        name="ScreenHistoricoConsultas"
        component={ScreenHistoricoConsultas}
      />
    </Stack.Navigator>
  );
}
