import {Consulta, ConsultaService} from '../../service/ConsultaService';
import {ToastAndroid, TouchableOpacity, View} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Body} from '../../ui/theme/components/typography';
import CustomButton from '../../components/CustomButton';
import {GreenColor} from '../../utils/AppUtils';
import {RootStackParamList} from '../../routes/app.routes';
import {SessionContext} from '../../context/SessionContext';
import type {StackNavigationProp} from '@react-navigation/stack';
import ViewThemed from '../../components/ViewThemed';
import Voltar from '../../components/Voltar';
import {useTheme} from '../../context/ThemeContext';

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
  const {theme} = useTheme();

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
    <ViewThemed>
      <Voltar text="Agendar Consulta" />

      <View style={{padding: 15, marginTop: 10}}>
        <Body>Escolha o horário do atendimento</Body>
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
                <Body
                  color={
                    theme.name == 'light'
                      ? theme.colors.text
                      : theme.colors.background
                  }>
                  {v}
                </Body>
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
    </ViewThemed>
  );
}
