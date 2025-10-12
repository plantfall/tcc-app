import {AppUtils, BlueColor} from '../utils/AppUtils';
import {Text, TouchableOpacity, View} from 'react-native';
import {useContext, useEffect, useState} from 'react';

import {CircularName} from './CircularName';
import {ConsultaService} from '../service/ConsultaService';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import LinearGradient from 'react-native-linear-gradient';
import {NotificationService} from '../service/NotificationService';
import {SessionContext} from '../context/SessionContext';
import {useNavigation} from '@react-navigation/native';

type Props = {
  nome: string;
};

export default function HomeHeader({nome}: Props) {
  const [dtProximaConsulta, setDtProximaConsulta] = useState<null | string>(
    null,
  );
  const consultaService = new ConsultaService();
  useEffect(() => {
    async function fetch() {
      const proximasConsultas = await consultaService.buscarProximasConsultas();
      console.log('proximasConsultas');
      console.log(proximasConsultas);
      setDtProximaConsulta(proximasConsultas[0]?.dataFormatada);
    }

    fetch();
  }, []);

  return (
    <LinearGradient
      colors={AppUtils.Gradient}
      style={{
        gap: 10,
        paddingHorizontal: 15,
      }}>
      <Top nome={nome} />
      <Text
        style={{fontSize: AppUtils.FontSize, marginTop: 20, marginBottom: 10}}>
        Sua próxima consulta está agendada para:
      </Text>
      <View
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          paddingVertical: 8,
          alignItems: 'center',
          paddingLeft: 5,
          gap: 10,
          marginBottom: 20,
          borderRadius: 10,
          alignSelf: 'flex-start', // garante que a View não se estique
        }}>
        <FontAwesome name="calendar" color={'##002230'} size={15} />
        <Text
          style={{
            color: '#002230',
            fontSize: AppUtils.FontSize,
            width: 150,
          }}>
          {dtProximaConsulta == null
            ? 'Nenhum agendamento encontrado'
            : dtProximaConsulta}
        </Text>
      </View>
    </LinearGradient>
  );
}

const circleSize = 10;
function Top({nome}: Props) {
  const limitarNome = (texto: string | undefined, limite = 15) => {
    if (texto == undefined) {
      return '';
    }

    return texto.split(' ')[0];
  };

  const [notificacoesAmount, setNotificacoesAmount] = useState(0);
  const nav = useNavigation();
  const {user} = useContext(SessionContext);

  useEffect(() => {
    async function loadNotificacoes() {
      try {
        const list = await NotificationService.ListarNotificacoes(user?.uid!);
        setNotificacoesAmount(list.length);
      } catch (error) {
        console.error('Erro ao carregar notificações:', error);
      }
    }

    // Carrega imediatamente
    loadNotificacoes();

    // Configura o intervalo para buscar a cada 3 segundos
    const intervalId = setInterval(loadNotificacoes, 3000);

    // Cleanup: remove o intervalo quando o componente desmontar
    return () => clearInterval(intervalId);
  }, []); // Adicione dependências se necessário

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <TouchableOpacity onPress={() => nav.navigate('ScreenPerfil')}>
          <CircularName nome={nome} />
        </TouchableOpacity>

        <Text style={{fontSize: 20, fontWeight: '700', color: '#002230'}}>
          Ola, {limitarNome(nome)}!
        </Text>
      </View>

      <View>
        <TouchableOpacity
          style={{position: 'relative'}}
          onPress={() => nav.navigate('ScreenNotificacoes')}>
          <Feather name="bell" color={BlueColor} size={20} />
        </TouchableOpacity>

        {notificacoesAmount > 0 && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              height: circleSize,
              width: circleSize,
              borderRadius: circleSize / 2,
            }}
          />
        )}
      </View>
    </View>
  );
}
