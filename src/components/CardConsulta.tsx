import {useState, useMemo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {getNomeApropriado} from '../screens/ScreenAgendarConsulta/ScreenAgendarConsulta';
import {AppUtils} from '../utils/AppUtils';
import {Consulta} from '../service/ConsultaService';
import {formatarDataPorExtenso} from '../utils/DateUtils';

type Props = {
  consulta: Consulta;
  emScreenConsultaAgendada?: boolean;
};

export default function CardConsulta({
  consulta,
  emScreenConsultaAgendada,
}: Props) {
  const {dataMarcada, especialista, status, horarioMarcado} = consulta;

  const size = 10;

  const [status_, setStatus_] = useState('');
  const [corCirculo, setCorCirculo] = useState('');

  useMemo(() => {
    switch (status) {
      case 'AGENDADA':
        setStatus_('Agendada');
        setCorCirculo('green');
        break;
      case 'CANCELADA':
        setStatus_('Cancelada');
        setCorCirculo('red');
        break;
      case 'CONCLUIDA':
        setStatus_('Concluída');
        setCorCirculo('#003950');
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
          <Image
            source={require('../assets/images/icone_em_card.png')}
            style={{height: 40, width: 40}}
          />
          <View>
            <Text style={{fontSize: AppUtils.FontSizeMedium}}>
              Data: {formatarDataPorExtenso(dataMarcada)}
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
          <TouchableOpacity
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
          </TouchableOpacity>

          <TouchableOpacity
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
