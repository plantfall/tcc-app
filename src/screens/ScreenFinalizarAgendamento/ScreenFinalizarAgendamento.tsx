import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import Voltar from '../../components/Voltar';
import {useContext, useEffect, useState} from 'react';
import CustomButton from '../../components/CustomButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/app.routes';
import {Consulta, ConsultaService} from '../../service/ConsultaService';
import {SessionContext} from '../../context/SessionContext';
import {BlueColor, GreenColor} from '../../utils/AppUtils';
import {DataAlvoDadoEhValida} from '../../utils/DateUtils';

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
  const {user} = useContext(SessionContext);

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

    const userId = user?.uid;

    setLoading(true);

    consulta.horarioMarcado = horarioSelected;

    if (!DataAlvoDadoEhValida(horarioSelected, date)) {
      ToastAndroid.show(
        'ERRO - O horário escolhido não é válido!',
        ToastAndroid.LONG,
      );

      setLoading(false);
      return;
    }

    const consultas = await consultaService.fetchConsultas(userId);

    const founded = consultas.find(
      v =>
        v.dataFormatada == consulta.dataFormatada &&
        v.horarioMarcado == consulta.horarioMarcado &&
        v.especialista.nome == consulta.especialista.nome,
    );

    if (founded != undefined) {
      ToastAndroid.show(
        'ERRO - Você já registrou essa consulta com essa mesma data e horário!',
        ToastAndroid.LONG,
      );

      setLoading(false);
      return;
    }

    if (editMode) {
      await consultaService.editarConsulta(user?.uid, consulta);
    } else await consultaService.agendarConsulta(user?.uid, consulta);

    setLoading(false);

    nav.navigate('ScreenConsultaAgendada', {
      consulta: consulta,
      editMode: editMode,
    });
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
