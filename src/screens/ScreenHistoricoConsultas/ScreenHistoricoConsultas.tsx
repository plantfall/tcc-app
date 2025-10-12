import {useContext, useEffect, useState} from 'react';
import {FlatList, Text, ToastAndroid, View} from 'react-native';
import {Consulta, ConsultaService} from '../../service/ConsultaService';
import {AppUtils, BlueColor} from '../../utils/AppUtils';

import CardConsulta from '../../components/CardConsulta';
import CustomButton from '../../components/CustomButton';
import CustomPopup from '../../components/CustomPopup';
import Voltar from '../../components/Voltar';
import {SessionContext} from '../../context/SessionContext';

export default function ScreenHistoricoConsultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const consultaService = new ConsultaService();

  const [consultaSelected, setConsultaSelected] = useState<Consulta | null>(
    null,
  );

  const {user, modoDesenvolvedor} = useContext(SessionContext);

  useEffect(() => {
    loadConsultas();

    async function loadConsultas() {
      setConsultas(await consultaService.fetchConsultas(user?.uid!));
    }
  }, []);

  const handleDeleteAll = async () => {
    await consultaService.deleteAll();
    setConsultas([]);
  };

  const handleCancelarConsulta = async () => {
    try {
      if (consultaSelected != null) {
        await consultaService.cancelarConsulta(
          user?.uid!,
          consultaSelected.id!,
        );

        console.log(consultaSelected);

        setConsultas(oldConsultas =>
          oldConsultas.map(c =>
            c.id === consultaSelected.id! ? {...c, status: 'CANCELADA'} : c,
          ),
        );
      }
    } catch (e: any) {
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    } finally {
      setConsultaSelected(null);
    }
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Voltar text="Minhas consultas" />

      <CustomPopup
        title="Tem certeza disso?"
        message="Realmente quer cancelar sua consulta?"
        visible={consultaSelected != null}
        onClose={() => {}}
        btns={[
          {
            text: 'Foi sem querer',
            bgColor: '#e80d0dff',
            onClick: () => setConsultaSelected(null),
          },
          {
            text: 'Confirmar',
            bgColor: BlueColor,
            onClick: async () => {
              await handleCancelarConsulta();
            },
          },
        ]}
      />
      <View style={{padding: 15}}>
        {modoDesenvolvedor && (
          <CustomButton
            text="Excluir tudo"
            onClick={handleDeleteAll}
            bgColor="red"
          />
        )}
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
          ListEmptyComponent={() => {
            return (
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: AppUtils.FontSizeMedium,
                  }}>
                  Nenhuma consulta encontrada!
                </Text>
              </View>
            );
          }}
          contentContainerStyle={{paddingBottom: 150}} // 👈 resolve
        />
      </View>
    </View>
  );
}
