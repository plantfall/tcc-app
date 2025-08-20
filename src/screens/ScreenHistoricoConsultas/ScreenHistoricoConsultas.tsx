import {View, FlatList} from 'react-native';
import Voltar from '../../components/Voltar';
import {useContext, useEffect, useState} from 'react';
import CardConsulta from '../../components/CardConsulta';
import {Consulta, ConsultaService} from '../../service/ConsultaService';
import {SessionContext} from '../../context/SessionContext';

export default function ScreenHistoricoConsultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const consultaService = new ConsultaService();

  const {user} = useContext(SessionContext);

  useEffect(() => {
    loadConsultas();

    async function loadConsultas() {
      setConsultas(await consultaService.fetchConsultas(user?.uid));
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
