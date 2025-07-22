import FontAwesome from '@react-native-vector-icons/fontawesome';
import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {AppUtils} from '../utils/AppUtils';

type Props = {
  nome: string;
};

export default function HomeHeader({nome}: Props) {
  const [dtProximaConsulta, setDtProximaConsulta] = useState('');
  useEffect(() => {
    const buscarProximaConsulta = async () => {
      //
      setDtProximaConsulta('22/08/2025');
    };

    buscarProximaConsulta();
  }, []);

  return (
    <LinearGradient
      colors={['#fff', '#DFEFF5', '#BFDFEB', '#80BFD8', '#1B8CB9', '#1B8CB9']}
      style={{
        gap: 10,
        marginTop: 30,
        paddingHorizontal: 15,
      }}>
      <Top nome={nome} />
      <Text>Sua próxima consulta está agendada para:</Text>
      <View
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          paddingVertical: 8,
          paddingHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          width: 140,
          marginBottom: 20,
          borderRadius: 10,
          borderColor: '#8C8C8C',
          borderWidth: 1,
        }}>
        <FontAwesome name="calendar" color={'#1B8CB9'} />
        <Text
          style={{
            color: '#002230',
            fontSize: AppUtils.FontSize,
          }}>
          {dtProximaConsulta}
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
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <CircularImage nome={nome} />
        <Text style={{fontSize: 20, fontWeight: '700', color: '#002230'}}>
          Ola, {limitarNome(nome)}!
        </Text>
      </View>
      <TouchableOpacity>
        <Feather name="bell" color={'blue'} size={20} />
      </TouchableOpacity>
    </View>
  );
}

function CircularImage({nome}: Props) {
  const size = 40;
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: size,
        width: size,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: '#1B8CB9',
      }}>
      <Text style={{fontSize: 20, color: '#002230'}}>{nome.charAt(0)}</Text>
    </View>
  );
}
