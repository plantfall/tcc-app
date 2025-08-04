import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Voltar from '../../components/Voltar';
import {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import CustomPopup from '../../components/CustomPopup';

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

  const [consultaAgendada, setConsultaAgendada] = useState(true);

  const handleHorarioClick = (horario: string) => {
    if (horarioSelected == horario) {
      setHorarioSelected(null);
      return;
    }
    setHorarioSelected(horario);
  };

  const handleAgendar = async () => {
    setConsultaAgendada(false);

    //agendar
    setTimeout(() => {
      setConsultaAgendada(true);
    }, 5000);
  };

  const handleFechar = () => {
    //levar usuario para os agendamentos dele
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Voltar text="Agendar Consulta" />

      <View style={{padding: 15}}>
        <CustomPopup
          visible={consultaAgendada}
          title="Consulta Agendada"
          message="Sua consulta foi agendada com sucesso"
          emoji="😉"
          onClose={handleFechar}
        />
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
