import {View, FlatList} from 'react-native';
import Voltar from '../../components/Voltar';
import {useEffect, useState} from 'react';
import {Especialista} from '../ScreenAgendarConsulta/useAgendarConsulta';
import CardConsulta from '../../components/CardConsulta';
import {Consulta} from '../../service/ConsultaService';

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
          renderItem={({item}) => <CardConsulta consulta={item} />}
        />
      </View>
    </View>
  );
}
