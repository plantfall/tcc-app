import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Voltar from '../../components/Voltar';
import {useEffect, useState} from 'react';
import {Especialista} from '../ScreenAgendarConsulta/useAgendarConsulta';
import {AppUtils} from '../../utils/AppUtils';
import {getNomeApropriado} from '../ScreenAgendarConsulta/ScreenAgendarConsulta';

type Status = 'AGENDADA' | 'CANCELADA' | 'CONCLUIDA';
type Consulta = {
  especialista: Especialista;
  dataMarcada: string;
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
          dataMarcada: '05/10/2025 às 08:00',
          status: 'AGENDADA',
        },

        {
          especialista: {
            nome: 'Dr Mauro Strevis Allious',
            especializacao: 'MEDICO',
          },
          dataMarcada: '09/11/2025 às 08:30',
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
  const {dataMarcada, especialista, status} = consulta;

  const size = 10;
  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
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
          <Text>{dataMarcada}</Text>
          <Text>{especialista.nome}</Text>
          <Text>{getNomeApropriado(especialista.especializacao)}</Text>
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
              backgroundColor: status == 'AGENDADA' ? 'green' : 'red',
            }}
          />

          <TouchableOpacity>
            <Text style={{fontSize: AppUtils.FontSize}}>{status}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {status == 'AGENDADA' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 30,
            marginTop: 40,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'green',
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
        </View>
      )}
    </View>
  );
}
