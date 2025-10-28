import {useContext, useEffect, useState} from 'react';
import {FlatList, ToastAndroid, View} from 'react-native';
import {Consulta, ConsultaService} from '../../service/ConsultaService';

import CustomButton from '../../components/CustomButton';
import CustomPopup from '../../components/CustomPopup';
import ViewThemed from '../../components/ViewThemed';
import Voltar from '../../components/Voltar';
import {SessionContext} from '../../context/SessionContext';
import {useTheme} from '../../context/ThemeContext';
import {Body} from '../../ui/theme/components/typography';
import CardConsulta from './components/CardConsulta';

export default function ScreenHistoricoConsultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const consultaService = new ConsultaService();

  const [consultaSelected, setConsultaSelected] = useState<Consulta | null>(
    null,
  );

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const {user, modoDesenvolvedor} = useContext(SessionContext);
  const {theme} = useTheme();

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
      setIsPopupVisible(false);
    }
  };

  return (
    <ViewThemed>
      <Voltar text="Minhas consultas" />

      <CustomPopup
        title="Confirma o cancelamento da consulta?"
        message="Ao confirmar, sua consulta será cancelada. Você poderá agendar novamente quando desejar."
        visible={isPopupVisible}
        onClose={() => {
          setConsultaSelected(null);
          setIsPopupVisible(false);
        }}
        btns={[
          {
            text: 'Cancelar',
            color: theme.colors.primary,
            bgColor: 'white',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: theme.colors.primary,
            onClick: () => setIsPopupVisible(false),
          },

          {
            text: 'Confirmar',
            bgColor: theme.colors.primary,
            borderRadius: 10,
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
                console.log('clicou');
                setIsPopupVisible(true);
                setConsultaSelected(consulta);
                console.log(consulta);
              }}
              theme={theme}
            />
          )}
          ListEmptyComponent={() => {
            return (
              <View style={{alignItems: 'center'}}>
                <Body>Nenhuma consulta encontrada!</Body>
              </View>
            );
          }}
          contentContainerStyle={{paddingBottom: 150}} // 👈 resolve
        />
      </View>
    </ViewThemed>
  );
}
