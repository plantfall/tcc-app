import {View, Text, TouchableOpacity} from 'react-native';
import Voltar from '../../components/Voltar';
import {useContext, useEffect, useState} from 'react';
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
  const [horarioSelected, setHorarioSelected] = useState<string>('');

  const consultaService = new ConsultaService();
  const {user} = useContext(SessionContext);

  const {params} = useRoute();

  const consulta: Consulta = params?.consulta;
  const editMode: boolean = params?.editMode;

  console.log('editmode: ' + editMode);

  useEffect(() => {
    if (editMode) {
      setHorarioSelected(consulta.horarioMarcado);
    }
  }, []);

  const handleHorarioClick = (horario: string) => {
    if (horarioSelected == horario) {
      setHorarioSelected(null);
      return;
    }
    setHorarioSelected(horario);
  };

  const nav = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleAgendar = async () => {
    consulta.horarioMarcado = horarioSelected;
    console.log('handle agendamento');

    console.log('editmode: ' + editMode);

    console.log(consulta);

    if (editMode) {
      await consultaService.editarConsulta(user?.uid, consulta);
    } else await consultaService.agendarConsulta(user?.uid, consulta);

    nav.navigate('ScreenConsultaAgendada', {
      consulta: consulta,
      editMode: editMode,
    });
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

        <CustomButton
          text={editMode ? 'Alterar agendamento' : 'Agendar'}
          onClick={handleAgendar}
        />
      </View>
    </View>
  );
}
