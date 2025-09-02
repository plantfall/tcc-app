import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import ScreenAgendarConsulta from '../screens/ScreenAgendarConsulta/ScreenAgendarConsulta';
import ScreenFinalizarAgendamento from '../screens/ScreenFinalizarAgendamento/ScreenFinalizarAgendamento';
import ScreenHistoricoConsultas from '../screens/ScreenHistoricoConsultas/ScreenHistoricoConsultas';
import ScreenEscolherDia from '../screens/ScreenEscolherDia/ScreenEscolherDia';
import ScreenNotificacoes from '../screens/ScreenNotificacoes/ScreenNotificacoes';
import ScreenConsultaAgendada from '../screens/ScreenConsultaAgendada/ScreenConsultaAgendada';
import ScreenPerfil from '../screens/ScreenPerfil/ScreenPerfil';
import ScreenLocalizacaoUbs from '../screens/ScreenLocalizacaoUbs/ScreenLocalizacaoUbs';
import ScreenEsqueciMinhaSenha from '../screens/ScreenEsqueciMinhaSenha/ScreenEsqueciMinhaSenha';

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

      <Stack.Screen name="ScreenNotificacoes" component={ScreenNotificacoes} />
    </Stack.Navigator>
  );
}
