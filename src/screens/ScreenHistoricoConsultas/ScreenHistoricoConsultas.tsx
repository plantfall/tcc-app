import {View, FlatList} from 'react-native';
import Voltar from '../../components/Voltar';
import {useContext, useEffect, useState} from 'react';
import CardConsulta from '../../components/CardConsulta';
import {Consulta, ConsultaService} from '../../service/ConsultaService';
import {SessionContext} from '../../context/SessionContext';
import CustomPopup from '../../components/CustomPopup';

export default function ScreenHistoricoConsultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const consultaService = new ConsultaService();

  const [consultaSelected, setConsultaSelected] = useState<Consulta | null>(
    null,
  );

  //kdekdneedniednieed

  //wdnwiudbwddbewiod

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

      <CustomPopup
        title="Tem certeza disso?"
        message="Realmente quer cancelar sua consulta?"
        btns={[
          {text: 'Foi sem querer', bgColor: '#e80d0dff', onClick: () => {}},
          {
            text: 'Confirmar',
            bgColor: '#007BFF',
            onClick: async () => {
              const cancelou = await consultaService.cancelarConsulta(
                user?.uid,
                consultaSelected.id,
              );

              if (cancelou) {
                setConsultas(oldConsultas =>
                  oldConsultas.map(c =>
                    c.id === consultaSelected.id
                      ? {...c, status: 'CANCELADA'}
                      : c,
                  ),
                );
              }

              setConsultaSelected(null);
            },
          },
        ]}
        visible={consultaSelected != null}
        onClose={() => {}}
      />
      <View style={{padding: 15}}>
        <FlatList
          data={consultas}
          renderItem={({item}) => (
            <CardConsulta
              consulta={item}
              callbackCancelar={consulta => {
                setConsultaSelected(consulta);
              }}
            />
          )}
        />
      </View>
    </View>
  );
}
