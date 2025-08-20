import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import ScreenAgendarConsulta from '../screens/ScreenAgendarConsulta/ScreenAgendarConsulta';
import ScreenFinalizarAgendamento from '../screens/ScreenFinalizarAgendamento/ScreenFinalizarAgendamento';
import ScreenHistoricoConsultas from '../screens/ScreenHistoricoConsultas/ScreenHistoricoConsultas';
import ScreenDefinirDiaHorario from '../screens/ScreenDefinirDiaHorario/ScreenDefinirDiaHorario';
import ScreenNotificacoes from '../screens/ScreenNotificacoes/ScreenNotificacoes';
import ScreenConsultaAgendada from '../screens/ScreenConsultaAgendada/ScreenConsultaAgendada';
import ScreenPerfil from '../screens/ScreenPerfil/ScreenPerfil';
import ScreenBoarding from '../screens/ScreenBoarding/ScreenBoarding';

export type RootStackParamList = {
  Home: undefined;
  ScreenAgendarConsulta: undefined;
  ScreenDefinirDiaHorario: undefined;
  ScreenFinalizarAgendamento: undefined;
  ScreenHistoricoConsultas: undefined;
};

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
        orientation: 'portrait',
      }}>
      <Stack.Screen
        name="ScreenConsultaAgendada"
        component={ScreenConsultaAgendada}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ScreenPerfil" component={ScreenPerfil} />

      <Stack.Screen
        name="ScreenAgendarConsulta"
        component={ScreenAgendarConsulta}
      />
      <Stack.Screen
        name="ScreenDefinirDiaHorario"
        component={ScreenDefinirDiaHorario}
      />
      <Stack.Screen
        name="ScreenFinalizarAgendamento"
        component={ScreenFinalizarAgendamento}
      />
      <Stack.Screen
        name="ScreenHistoricoConsultas"
        component={ScreenHistoricoConsultas}
      />
      <Stack.Screen name="ScreenNotificacoes" component={ScreenNotificacoes} />
    </Stack.Navigator>
  );
}
