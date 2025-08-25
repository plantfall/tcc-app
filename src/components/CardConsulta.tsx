import {useState, useMemo} from 'react';
import {View, Text, TouchableOpacity, Image, Pressable} from 'react-native';
import {getNomeApropriado} from '../screens/ScreenAgendarConsulta/ScreenAgendarConsulta';
import {AppUtils} from '../utils/AppUtils';
import {Consulta} from '../service/ConsultaService';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from '@react-native-vector-icons/fontawesome';

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

  const size = 10;

  const [status_, setStatus_] = useState('');
  const [corCirculo, setCorCirculo] = useState('');
  const [iconName, seticonName] = useState('');

  const nav = useNavigation();

  useMemo(() => {
    switch (status) {
      case 'AGENDADA':
        setStatus_('Agendada');
        setCorCirculo('green');
        seticonName('calendar');
        break;
      case 'CANCELADA':
        setStatus_('Cancelada');
        setCorCirculo('red');
        seticonName('remove');
        break;
      case 'CONCLUIDA':
        setStatus_('Concluída');
        setCorCirculo('#003950');
        seticonName('check-square-o');
        break;
    }
  }, [status]);

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
              {getNomeApropriado(especialista.especializacao)}
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
              <Text style={{fontSize: AppUtils.FontSize - 2}}>{status_}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {status == 'AGENDADA' && !emScreenConsultaAgendada && (
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
