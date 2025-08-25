import {View, FlatList, Text, TouchableOpacity, Image} from 'react-native';
import Voltar from '../../components/Voltar';
import ScreenConfimacaoHook, {
  Especialista,
  Especializacao,
  imagens,
} from './useAgendarConsulta';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {AppUtils, GreenColor} from '../../utils/AppUtils';
import {useEffect, useState} from 'react';
import {CircleImage} from '../../components/CircleImage';

export default function ScreenAgendarConsulta() {
  const {especialistas, turnDatePickerOn} = ScreenConfimacaoHook();

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Voltar text="Agendar Consulta" />
      <View>
        {especialistas.map((v, index) => {
          return (
            <View key={index}>
              <EspecialistaCard
                especialista={v}
                turnDatePickerOn={turnDatePickerOn}
              />
              <View style={{height: 5, backgroundColor: '#F5F5F5'}} />
            </View>
          );
        })}
      </View>
    </View>
  );
}

type Props = {
  especialista: Especialista;
  turnDatePickerOn: () => void;
};
function EspecialistaCard({especialista, turnDatePickerOn}: Props) {
  const nav = useNavigation();

  const [primeiroDiaDisponivel, setPrimeiroDiaDisponivel] = useState('');

  useEffect(() => {
    let mes = especialista.diasDisponiveis[0].split('-')[1];
    let ano = especialista.diasDisponiveis[0].split('-')[2];

    const dias = especialista.diasDisponiveis.map(v => {
      const split = v.split('-');
      const dia = split[0];
      return Number(dia);
    });

    const ordemCrescente = dias.sort((a, b) => a - b);
    const primeiroDia = ordemCrescente[0];
    setPrimeiroDiaDisponivel(`${primeiroDia}-${mes}-${ano}`);
  }, []);

  return (
    <View style={{paddingVertical: 20, paddingLeft: 40}}>
      <Top especialista={especialista} turnDatePickerOn={turnDatePickerOn} />
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          marginTop: 22,
          alignItems: 'center',
        }}>
        <Feather name={'calendar'} size={15} />
        <Text
          style={{
            color: '#4F4F4F',
            fontSize: AppUtils.FontSize,
          }}>
          Próxima data: {primeiroDiaDisponivel}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          nav.navigate('ScreenEscolherDia', {especialista: especialista});
        }}
        style={{
          flexDirection: 'row',
          gap: 10,
          backgroundColor: GreenColor,
          paddingVertical: 7,
          maxWidth: 170,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginTop: 10,
        }}>
        <Text style={{color: 'black', fontSize: AppUtils.FontSize}}>
          Agendar horário
        </Text>
        <Feather name={'chevron-right'} size={15} />
      </TouchableOpacity>
    </View>
  );
}

function Top({especialista}: Props) {
  return (
    <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
      {/* IMAGEM CIRCULAR */}

      <CircleImage especialista={especialista} size={80} />

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

export function getNomeApropriado(especializacao: Especializacao) {
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
