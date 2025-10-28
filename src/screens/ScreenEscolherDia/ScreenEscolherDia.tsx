import {Calendar, LocaleConfig} from 'react-native-calendars';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Body} from '../../ui/theme/components/typography';
import {Consulta} from '../../service/ConsultaService';
import {ConverterStringParaDataFormatoBrasileiroPorExtendo} from '../../utils/DateUtils';
import {Especialista} from '../ScreenAgendarConsulta/useAgendarConsulta';
import Top from './components/Top';
import {View} from 'react-native';
import ViewThemed from '../../components/ViewThemed';
import Voltar from '../../components/Voltar';
import {useTheme} from '../../context/ThemeContext';

// Configurar locale para português (opcional, mas recomendado)
LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt';

export default function ScreenEscolherDia() {
  const {params} = useRoute();

  const consulta: Consulta = params?.consulta;
  const editMode: boolean = params?.editMode || false;

  console.log(editMode);

  const especialista: Especialista = editMode
    ? consulta.especialista
    : params?.especialista;

  const diasDisponiveis = especialista.diasDisponiveis;

  console.log(diasDisponiveis);

  let dateSelected: Date | null = null;

  if (editMode) {
    dateSelected = new Date(consulta.dataMarcadaMilisegundos);
  }

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
      selectedColor: '#72C4E58C',
      selectedTextColor: 'black',
    };
  });

  // Marcar dia selecionado (azul)
  if (dateSelected) {
    const selKey = dateSelected.toISOString().split('T')[0];
    if (diasDisponiveisFormatados.includes(selKey)) {
      markedDates[selKey] = {
        ...(markedDates[selKey] || {}),
        selected: true,
        selectedColor: '#72C4E58C',
        selectedTextColor: 'black',
      };
    }
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

  const {theme} = useTheme();

  return (
    <ViewThemed>
      <Voltar text="Calendário de Consulta" />
      <View style={{marginHorizontal: 10, marginTop: 20}}>
        <Top especialista={especialista} theme={theme} />

        <View style={{margin: 10}}>
          <Body>
            Selecione no calendário o dia em que deseja realizar sua consulta:
          </Body>
        </View>

        <View style={{margin: 10}}>
          <Body color={theme.colors.textLabel}>
            *Os dias destacados estão disponíveis para agendamento
          </Body>
        </View>

        <Calendar
          markedDates={markedDates}
          monthFormat="MMMM yyyy"
          onDayPress={day => {
            if (diasDisponiveisFormatados.includes(day.dateString)) {
              //setDateSelected(new Date(day.dateString));

              const consultaObj: Consulta = {
                dataFormatada:
                  ConverterStringParaDataFormatoBrasileiroPorExtendo(
                    day.dateString,
                  ),
                dataMarcadaMilisegundos: editMode
                  ? consulta.dataMarcadaMilisegundos
                  : day.timestamp,
                especialista: especialista,
                horarioMarcado:
                  consulta != undefined ? consulta.horarioMarcado : '',
                status: consulta != undefined ? consulta.status : 'AGENDADA',
                id: consulta != undefined ? consulta.id : '',
              };

              console.info(day.dateString);
              nav.navigate('ScreenFinalizarAgendamento', {
                editMode: editMode,
                consulta: consultaObj,
                date: day,
              });
            }
          }}
        />
      </View>
    </ViewThemed>
  );
}
