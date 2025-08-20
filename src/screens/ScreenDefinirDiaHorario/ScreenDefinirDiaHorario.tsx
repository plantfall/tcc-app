import {View, Text} from 'react-native';
import Voltar from '../../components/Voltar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppUtils} from '../../utils/AppUtils';
import {Calendar} from 'react-native-calendars';
import {getNomeApropriado} from '../ScreenAgendarConsulta/ScreenAgendarConsulta';
import {Especialista} from '../ScreenAgendarConsulta/useAgendarConsulta';
import {useState} from 'react';

export default function ScreenDefinirDiaHorario() {
  const {params} = useRoute();
  const especialista: Especialista = params?.dado;
  const diasDisponiveis = especialista.diasDisponiveis;

  const [dateSelected, setDateSelected] = useState(new Date());

  const nav = useNavigation();

  // Converter lista para formato do Calendar
  const diasDisponiveisFormatados = diasDisponiveis.map(dia => {
    const [day, month, year] = dia.split('-');
    return `${year}-${month}-${day}`;
  });

  const markedDates = {};

  // Marcar dias disponíveis (verde)
  diasDisponiveisFormatados.forEach(dateKey => {
    markedDates[dateKey] = {
      selected: true,
      selectedColor: '#4CAF50',
      selectedTextColor: '#fff',
    };
  });

  // Marcar dia selecionado (azul)
  if (dateSelected) {
    const selKey = dateSelected.toISOString().split('T')[0];
    markedDates[selKey] = {
      ...(markedDates[selKey] || {}),
      selected: true,
      selectedColor: '#2196F3',
      selectedTextColor: '#fff',
    };
  }

  // Bloquear todos os dias que não estão na lista de disponíveis
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();

  for (let i = 1; i <= ultimoDia; i++) {
    const dia = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(
      i,
    ).padStart(2, '0')}`;
    if (!diasDisponiveisFormatados.includes(dia)) {
      markedDates[dia] = {
        ...(markedDates[dia] || {}),

        disableTouchEvent: true,
      };
    }
  }

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Voltar text="Calendário de Consulta" />
      <Top especialista={especialista} />
      <Text style={{margin: 10, fontSize: AppUtils.FontSize}}>
        Selecione no calendário o dia em que deseja realizar sua consulta:
      </Text>

      <Text style={{margin: 10, color: '#8E8E8E', fontSize: AppUtils.FontSize}}>
        *Os dias destacados estão disponíveis para agendamento
      </Text>

      <Calendar
        markedDates={markedDates}
        onDayPress={day => {
          if (diasDisponiveisFormatados.includes(day.dateString)) {
            //setDateSelected(new Date(day.dateString));

            nav.navigate('ScreenFinalizarAgendamento', {
              especialista: especialista,
              diaSelecionado: new Date(day.dateString),
            });
          }
        }}
      />
    </View>
  );
}

type Props = {
  especialista: Especialista;
};
function Top({especialista}: Props) {
  const size = 50;
  return (
    <View
      style={{
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        margin: 10,
      }}>
      <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
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
    </View>
  );
}
