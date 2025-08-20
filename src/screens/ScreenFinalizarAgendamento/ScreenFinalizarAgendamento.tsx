import {View, Text, TouchableOpacity} from 'react-native';
import Voltar from '../../components/Voltar';
import {useContext, useState} from 'react';
import CustomButton from '../../components/CustomButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/app.routes';
import {Consulta, ConsultaService} from '../../service/ConsultaService';
import {SessionContext} from '../../context/SessionContext';

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

  const consultaService = new ConsultaService();
  const {user} = useContext(SessionContext);

  const {params} = useRoute();

  const handleHorarioClick = (horario: string) => {
    if (horarioSelected == horario) {
      setHorarioSelected(null);
      return;
    }
    setHorarioSelected(horario);
  };

  const nav = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleAgendar = async () => {
    const diaSelecionado = params?.diaSelecionado;
    const especialista = params?.especialista;

    const consultaRequest: Consulta = {
      dataMarcada: diaSelecionado,
      especialista: especialista,
      horarioMarcado: horarioSelected,
      status: 'AGENDADA',
    };

    console.log(consultaRequest);

    await consultaService.agendarConsulta(user?.uid, consultaRequest);

    nav.navigate('ScreenConsultaAgendada', consultaRequest);
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
