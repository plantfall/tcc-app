import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import Voltar from '../../components/Voltar';
import ScreenConfimacaoHook, {
  Especialista,
  Especializacao,
} from './useAgendarConsulta';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {AppUtils} from '../../utils/AppUtils';

export default function ScreenAgendarConsulta() {
  const {loading, especialistas} = ScreenConfimacaoHook();

  const nav = useNavigation();

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Voltar text="Agendar Consulta" />
      <View>
        <FlatList
          data={especialistas}
          renderItem={({item}) => <EspecialistaCard especialista={item} />}
        />
      </View>
    </View>
  );
}

type Props = {
  especialista: Especialista;
};
function EspecialistaCard({especialista}: Props) {
  return (
    <View style={{padding: 15}}>
      <Top especialista={especialista} />
      <View style={{flexDirection: 'row', gap: 8, marginTop: 22}}>
        <Feather name={'calendar'} size={15} />
        <Text
          style={{
            color: '#4F4F4F',
            fontSize: AppUtils.FontSize,
          }}>
          Próxima data: Amanhã 18 de Setembro
        </Text>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          gap: 10,
          backgroundColor: '#BAE6C9',
          paddingHorizontal: 15,
          paddingVertical: 10,
          maxWidth: 170,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginTop: 10,
        }}>
        <Text style={{color: '#4F4F4F', fontSize: AppUtils.FontSize}}>
          Agendar horário
        </Text>
        <Feather name={'chevron-right'} size={15} />
      </TouchableOpacity>
    </View>
  );
}

function Top({especialista}: Props) {
  const size = 90;
  return (
    <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
      {/* IMAGEM CIRCULAR */}
      <View
        style={{
          height: size,
          width: size,
          backgroundColor: 'red',
          borderRadius: size / 2,
        }}></View>
      <View>
        <Text style={{fontSize: AppUtils.FontSizeMedium, fontWeight: '600'}}>
          {especialista.nome}
        </Text>
        <Text style={{fontSize: AppUtils.FontSize}}>
          {getNomeApropriado(especialista.especializacao)}
        </Text>
      </View>
    </View>
  );
}

function getNomeApropriado(especializacao: Especializacao) {
  switch (especializacao) {
    case 'CLINICO_GERAL':
      return 'Clínico Geral';
    case 'CLINICO_GERAL_PEDIATRA':
      return 'Clínico Geral/Pediatria';
    case 'MEDICO':
      return 'Médico';
    default:
      return 'Desconhecida';
  }
}
