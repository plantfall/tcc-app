import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Voltar from '../../components/Voltar';
import {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import CustomPopup from '../../components/CustomPopup';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/app.routes';

const HORARIOS = [
  '08:00',
  '08:30',
  '09:00',
  '10:30',
  '10:45',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '13:15',
  '15:45',
];

export default function ScreenFinalizarAgendamento() {
  const [horarioSelected, setHorarioSelected] = useState<null | string>(null);

  const [consultaAgendada, setConsultaAgendada] = useState(false);

  const {params} = useRoute();
  const diaSelecionado = params?.diaSelecionado;
  console.log(diaSelecionado);

  const handleHorarioClick = (horario: string) => {
    if (horarioSelected == horario) {
      setHorarioSelected(null);
      return;
    }
    setHorarioSelected(horario);
  };

  const nav = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleAgendar = async () => {
    setConsultaAgendada(false);
    setConsultaAgendada(false);

    //agendar
    setTimeout(() => {
      //levar usuario para os agendamentos dele
      setConsultaAgendada(false);
      nav.navigate('ScreenConsultaAgendada', {
        diaSelecionado,
        horarioSelected,
        especialistaId: '124_ID',
      });
    }, 3000);
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Voltar text="Agendar Consulta" />

      <View style={{padding: 15}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          {HORARIOS.map((v, index) => (
            <TouchableOpacity
              onPress={() => handleHorarioClick(v)}
              key={index}
              style={{
                width: '30%', // 3 por linha (com espaçamento)
                backgroundColor: v == horarioSelected ? '#BAE6C9' : '#F1F1F1',
                padding: 15,
                marginBottom: 10,
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Text>{v}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <CustomButton text="Agendar" onClick={handleAgendar} />
      </View>
    </View>
  );
}
