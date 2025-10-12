import Home from '../screens/Home/Home';
import ScreenAgendarConsulta from '../screens/ScreenAgendarConsulta/ScreenAgendarConsulta';
import ScreenConsultaAgendada from '../screens/ScreenConsultaAgendada/ScreenConsultaAgendada';
import ScreenEditarCartaoSus from '../screens/ScreenEditarCartaoSus/ScreenEditarCartaoSus';
import ScreenEscolherDia from '../screens/ScreenEscolherDia/ScreenEscolherDia';
import ScreenFinalizarAgendamento from '../screens/ScreenFinalizarAgendamento/ScreenFinalizarAgendamento';
import ScreenHistoricoConsultas from '../screens/ScreenHistoricoConsultas/ScreenHistoricoConsultas';
import ScreenLocalizacaoUbs from '../screens/ScreenLocalizacaoUbs/ScreenLocalizacaoUbs';
import ScreenNotificacoes from '../screens/ScreenNotificacoes/ScreenNotificacoes';
import ScreenPerfil from '../screens/ScreenPerfil/ScreenPerfil';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  ScreenAgendarConsulta: undefined;
  ScreenEscolherDia: undefined;
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
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ScreenLocalizacaoUbs"
        component={ScreenLocalizacaoUbs}
      />
      <Stack.Screen
        name="ScreenConsultaAgendada"
        component={ScreenConsultaAgendada}
      />

      <Stack.Screen
        name="ScreenHistoricoConsultas"
        component={ScreenHistoricoConsultas}
      />

      <Stack.Screen name="ScreenPerfil" component={ScreenPerfil} />

      <Stack.Screen
        name="ScreenAgendarConsulta"
        component={ScreenAgendarConsulta}
      />
      <Stack.Screen name="ScreenEscolherDia" component={ScreenEscolherDia} />
      <Stack.Screen
        name="ScreenFinalizarAgendamento"
        component={ScreenFinalizarAgendamento}
      />
      <Stack.Screen
        name="ScreenEditarCartaoSus"
        component={ScreenEditarCartaoSus}
      />

      <Stack.Screen name="ScreenNotificacoes" component={ScreenNotificacoes} />
    </Stack.Navigator>
  );
}
