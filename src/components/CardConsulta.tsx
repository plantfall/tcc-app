import {useContext, useEffect, useState} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {Consulta, ConsultaService} from '../service/ConsultaService';

import FontAwesome from '@react-native-vector-icons/fontawesome';
import {useNavigation} from '@react-navigation/native';
import {SessionContext} from '../context/SessionContext';
import {getEspecializacao} from '../screens/ScreenAgendarConsulta/ScreenAgendarConsulta';
import {AppUtils} from '../utils/AppUtils';

type Props = {
  consulta: Consulta;
  emScreenConsultaAgendada?: boolean;
  callbackCancelar?: (consulta: Consulta) => void;
};

export default function CardConsulta({
  consulta,
  emScreenConsultaAgendada,
  callbackCancelar,
}: Props) {
  const {dataFormatada, especialista, status, horarioMarcado} = consulta;

  const [currentStatus, setCurrentStatus] = useState(consulta.status);
  const [statusText, setStatusText] = useState('');
  const [corCirculo, setCorCirculo] = useState('');
  const [iconName, setIconName] = useState('');

  const size = 10;
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
        backgroundColor: '#fff',
        marginBottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* LEFT */}

        <View style={{flexDirection: 'row', columnGap: 20}}>
          <FontAwesome name={iconName} color={corCirculo} size={20} />
          <View>
            <Text style={{fontSize: AppUtils.FontSizeMedium}}>
              Data: {dataFormatada}
            </Text>
            <Text style={{fontSize: AppUtils.FontSizeMedium}}>
              Horário: {horarioMarcado}
            </Text>
            <Text
              style={{
                color: '#002230',
                fontSize: AppUtils.FontSizeGrande,
                marginTop: 20,
                fontWeight: '700',
              }}>
              {especialista.nome}
            </Text>
            <Text style={{fontSize: AppUtils.FontSizeMedium}}>
              {getEspecializacao(especialista.especializacao)}
            </Text>
          </View>
        </View>

        {/* DIRETA */}

        {!emScreenConsultaAgendada && (
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

            <TouchableOpacity>
              <Text style={{fontSize: AppUtils.FontSize - 2}}>
                {statusText}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {currentStatus == 'AGENDADA' && !emScreenConsultaAgendada && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 30,
            marginTop: 25,
          }}>
          <Pressable
            onPress={() => {
              if (callbackCancelar != undefined) callbackCancelar(consulta);
            }}
            style={{
              borderColor: 'red',
              borderRadius: 10,
              borderWidth: 1,
              paddingHorizontal: 15,
              paddingVertical: 8,
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'red', fontSize: AppUtils.FontSize}}>
              Cancelar
            </Text>
          </Pressable>

          <TouchableOpacity
            onPress={() =>
              nav.navigate('ScreenEscolherDia', {
                consulta: consulta,
                editMode: true,
              })
            }
            style={{
              backgroundColor: '#2390BB',
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 10,
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: AppUtils.FontSize}}>
              Editar
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
