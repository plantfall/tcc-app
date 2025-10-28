import {
  Body,
  Caption,
  StatusText,
} from '../../../ui/theme/components/typography';
import {Consulta, ConsultaService} from '../../../service/ConsultaService';
import {useContext, useEffect, useState} from 'react';

import CustomButton from '../../../components/CustomButton';
import {Especialista} from '../../ScreenAgendarConsulta/useAgendarConsulta';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import {SessionContext} from '../../../context/SessionContext';
import Spacer from '../../../components/Spacer';
import {Theme} from '../../../ui/theme/types';
import {View} from 'react-native';
import {getEspecializacao} from '../../ScreenAgendarConsulta/ScreenAgendarConsulta';
import {useNavigation} from '@react-navigation/native';

type Props = {
  consulta: Consulta;
  emScreenConsultaAgendada?: boolean;
  callbackCancelar?: (consulta: Consulta) => void;
  theme: Theme;
};

const size = 10;
export default function CardConsulta({
  consulta,
  emScreenConsultaAgendada,
  callbackCancelar,
  theme,
}: Props) {
  const {dataFormatada, especialista, horarioMarcado} = consulta;

  const [currentStatus, setCurrentStatus] = useState(consulta.status);
  const [statusText, setStatusText] = useState('');
  const [corCirculo, setCorCirculo] = useState('');
  const [iconName, setIconName] = useState('');

  const cs = new ConsultaService();

  const {user} = useContext(SessionContext);

  /**
   * Função que calcula o status de exibição, considerando o tempo.
   */
  const checkStatus = async () => {
    const {dataFormatada, horarioMarcado, status} = consulta;
    const date = ConsultaService.ParseDataHora(dataFormatada, horarioMarcado);
    const now = Date.now();
    let calculatedStatus = status;

    // Se a consulta estava AGENDADA e a hora já passou, consideramos CONCLUIDA na UI
    if (date.getTime() < now && status === 'AGENDADA') {
      // ATENÇÃO: Se você precisar salvar essa alteração no Firestore,
      // você deve chamar um serviço aqui ou no componente pai.
      calculatedStatus = 'CONCLUIDA';
      consulta.status = 'CONCLUIDA';

      await cs.editarConsulta(user?.uid!, consulta);
    }

    // Mapeamento visual baseado no status calculado ou vindo do prop
    switch (calculatedStatus) {
      case 'AGENDADA':
        setStatusText('Agendada');
        setCorCirculo('green');
        setIconName('calendar');
        break;
      case 'CANCELADA':
        setStatusText('Cancelada');
        setCorCirculo('red');
        setIconName('remove');
        break;
      case 'CONCLUIDA':
      default: // Cobre CONCLUIDA e qualquer outro valor inesperado
        setStatusText('Concluída');
        setCorCirculo('#003950');
        setIconName('check-square-o');
        break;
    }

    // Atualiza o estado local do status calculado para renderização e lógica condicional
    setCurrentStatus(calculatedStatus);
  };

  // 1. useEffect para rodar a lógica de status na montagem e sempre que a prop 'consulta' mudar
  useEffect(() => {
    checkStatus();

    // 2. Se a consulta estiver AGENDADA, configure um intervalo para verificar o status
    // A cada 1 minuto (60000ms), a função checkStatus será chamada.
    if (consulta.status === 'AGENDADA') {
      const intervalId = setInterval(checkStatus, 60000);

      // Limpeza: Importante para parar o intervalo quando o componente for desmontado ou
      // quando o status da consulta mudar (e o useEffect for re-executado).
      return () => clearInterval(intervalId);
    }
  }, [consulta]); // Depende da prop 'consulta'

  const nav = useNavigation();

  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#BAE6C9',
        padding: 10,
        backgroundColor: theme.colors.background,
        marginBottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Left
          corCirculo={corCirculo}
          especialista={especialista}
          iconName={iconName}
          dataFormatada={dataFormatada}
          horarioMarcado={horarioMarcado}
          theme={theme}
        />

        <Direita
          emScreenConsultaAgendada={emScreenConsultaAgendada!}
          corCirculo={corCirculo}
          statusText={statusText}
          theme={theme}
        />
      </View>

      {currentStatus == 'AGENDADA' && !emScreenConsultaAgendada && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 30,
            marginTop: 25,
          }}>
          <CustomButton
            bgColor={theme.colors.background}
            borderRadius={10}
            borderColor={'red'}
            borderWidth={1}
            onClick={() => {
              if (callbackCancelar != undefined) callbackCancelar(consulta);
            }}
            text="Cancelar"
            width={100}
            textColor="red"
          />

          <CustomButton
            borderRadius={10}
            onClick={() =>
              nav.navigate('ScreenEscolherDia', {
                consulta: consulta,
                editMode: true,
              })
            }
            text="Editar"
            width={100}
          />
        </View>
      )}
    </View>
  );
}

type l = {
  iconName: string;
  corCirculo: string;
  especialista: Especialista;
  dataFormatada: string;
  horarioMarcado: string;
  theme: Theme;
};
function Left({
  iconName,
  corCirculo,
  especialista,
  dataFormatada,
  horarioMarcado,
  theme,
}: l) {
  return (
    <View style={{flexDirection: 'row', columnGap: 20}}>
      <FontAwesome name={iconName} color={corCirculo} size={20} />
      <View>
        <Caption
          color={
            theme.name == 'light' ? theme.colors.secondary : theme.colors.text
          }>
          Data: {dataFormatada}
        </Caption>
        <Caption
          color={
            theme.name == 'light' ? theme.colors.secondary : theme.colors.text
          }>
          Horário: {horarioMarcado}
        </Caption>

        <Body
          color={
            theme.name == 'light' ? theme.colors.secondary : theme.colors.text
          }
          weight="bold">
          {especialista.nome}
        </Body>
        <Spacer height={20} />

        <Body>{getEspecializacao(especialista.especializacao)}</Body>
      </View>
    </View>
  );
}

type d = {
  corCirculo: string;
  statusText: string;
  emScreenConsultaAgendada: boolean;
  theme: Theme;
};
function Direita({corCirculo, statusText, emScreenConsultaAgendada, theme}: d) {
  if (emScreenConsultaAgendada) return null;

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        height: 20,
      }}>
      <View
        style={{
          height: size,
          width: size,
          borderRadius: size / 2,
          backgroundColor: corCirculo,
        }}
      />

      <StatusText color={theme.colors.text}>{statusText}</StatusText>
    </View>
  );
}
