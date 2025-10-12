import {useNavigation, useRoute} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {Consulta, ConsultaService} from '../../service/ConsultaService';

import type {StackNavigationProp} from '@react-navigation/stack';
import CustomButton from '../../components/CustomButton';
import Voltar from '../../components/Voltar';
import {SessionContext} from '../../context/SessionContext';
import {RootStackParamList} from '../../routes/app.routes';
import {GreenColor} from '../../utils/AppUtils';

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
  '16:45',
];

export default function ScreenFinalizarAgendamento() {
  const [horarioSelected, setHorarioSelected] = useState<string>('');
  const [isLoading, setLoading] = useState(false);

  const consultaService = new ConsultaService();

  const {user, segundosParaAgendarConsultaEmDevMode} =
    useContext(SessionContext);

  consultaService.injectSecondsInDevMode(segundosParaAgendarConsultaEmDevMode);

  const {params} = useRoute();

  const consulta: Consulta = params?.consulta;
  const editMode: boolean = params?.editMode;
  const date: any = params?.date;

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
    if (horarioSelected == '') return;

    setLoading(true);
    try {
      consulta.horarioMarcado = horarioSelected;

      if (editMode) {
        await consultaService.editarConsulta(user?.uid, consulta);
      } else await consultaService.agendarConsulta(user?.uid, consulta);

      nav.navigate('ScreenConsultaAgendada', {
        consulta: consulta,
        editMode: editMode,
      });
    } catch (e: any) {
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Voltar text="Agendar Consulta" />

      <View style={{padding: 15, marginTop: 10}}>
        <Text>Escolha o horário do atendimento</Text>
        <View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginTop: 10,
              marginBottom: 200,
              backgroundColor: '#fbf9f9ff',
              padding: 10,
              borderRadius: 7,
            }}>
            {HORARIOS.map((v, index) => (
              <TouchableOpacity
                onPress={() => handleHorarioClick(v)}
                key={index}
                style={{
                  width: '30%', // 3 por linha (com espaçamento)
                  backgroundColor: v == horarioSelected ? GreenColor : '#fff',
                  padding: 10,
                  marginBottom: 10,
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <Text>{v}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <CustomButton
          text={editMode ? 'Alterar agendamento' : 'Agendar'}
          onClick={handleAgendar}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
}
