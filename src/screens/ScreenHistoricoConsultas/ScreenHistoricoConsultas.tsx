import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Voltar from '../../components/Voltar';
import {useEffect, useMemo, useState} from 'react';
import {Especialista} from '../ScreenAgendarConsulta/useAgendarConsulta';
import {AppUtils} from '../../utils/AppUtils';
import {getNomeApropriado} from '../ScreenAgendarConsulta/ScreenAgendarConsulta';

type Status = 'AGENDADA' | 'CANCELADA' | 'CONCLUIDA';
type Consulta = {
  especialista: Especialista;
  dataMarcada: string;
  horarioMarcado: string;
  status: Status;
};

export default function ScreenHistoricoConsultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    loadConsultas();

    async function loadConsultas() {
      //...
      const lista: Consulta[] = [
        {
          especialista: {
            nome: 'Dra.Gabriela Garcia',
            especializacao: 'CLINICO_GERAL',
          },
          dataMarcada: '05/10/2025',
          horarioMarcado: '08:30',
          status: 'AGENDADA',
        },

        {
          especialista: {
            nome: 'Dr Mauro Strevis Allious',
            especializacao: 'MEDICO',
          },
          dataMarcada: '09/11/2025',
          horarioMarcado: '10:30',
          status: 'CANCELADA',
        },
      ];
      setConsultas(lista);
    }
  }, []);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Voltar text="Minhas consultas" />

      <View style={{padding: 15}}>
        <FlatList
          data={consultas}
          renderItem={({item}) => <Card consulta={item} />}
        />
      </View>
    </View>
  );
}

type Props = {
  consulta: Consulta;
};

function Card({consulta}: Props) {
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
        <View>
          <Text style={{fontSize: AppUtils.FontSizeMedium}}>
            Data: {dataMarcada}
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

        {/* DIRETA */}
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
      </View>

      {status == 'AGENDADA' && (
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
