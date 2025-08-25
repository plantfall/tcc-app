import FontAwesome from '@react-native-vector-icons/fontawesome';
import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {AppUtils, BlueColor} from '../utils/AppUtils';
import {useNavigation} from '@react-navigation/native';
import {CircularName} from './CircularName';
import {ConsultaService} from '../service/ConsultaService';

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
      const proximasConsultas = await consultaService.buscaProximaConsulta();
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
          maxWidth: 170,
          marginBottom: 20,
          borderRadius: 10,
        }}>
        <FontAwesome name="calendar" color={'##002230'} size={15} />
        <Text
          style={{
            color: '#002230',
            fontSize: AppUtils.FontSize,
          }}>
          {dtProximaConsulta == null
            ? 'Nenhum agendamento encontrado'
            : dtProximaConsulta}
        </Text>
      </View>
    </LinearGradient>
  );
}

function Top({nome}: Props) {
  const limitarNome = (texto: string | undefined, limite = 15) => {
    if (texto == undefined) {
      return '';
    }
    if (texto.length > limite) {
      return texto.substring(0, limite) + '...';
    }
    return texto;
  };

  const nav = useNavigation();
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
      <TouchableOpacity onPress={() => nav.navigate('ScreenNotificacoes')}>
        <Feather name="bell" color={BlueColor} size={20} />
      </TouchableOpacity>
    </View>
  );
}
