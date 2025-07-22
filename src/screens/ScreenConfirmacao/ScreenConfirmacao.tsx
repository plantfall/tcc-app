import {View, Text, StatusBar, FlatList} from 'react-native';
import CustomButton from '../../components/CustomButton';
import Voltar from '../../components/Voltar';
import ScreenConfimacaoHook from './ScreenConfirmacaoHook';
import {AppUtils} from '../../utils/AppUtils';
import CustomPopup from '../../components/CustomPopup';
import {useNavigation} from '@react-navigation/native';
import {GetDescricaoDoTipoRecebimento} from '../../mapper/TipoRecebimentoToDescricaoMapper';

export default function ScreenConfimacao() {
  const {
    loading,
    handleGerarNotas,
    popupSucessoVisible,
    listLoteVendaIaItem,
    whatsApp,
  } = ScreenConfimacaoHook();
  const nav = useNavigation();

  return (
    <View
      style={{padding: 20, gap: 10, paddingTop: 30, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />

      <Voltar text="Confirmação" />

      <CustomPopup
        visible={popupSucessoVisible}
        emoji="✅"
        title="Sucesso"
        message="Seu lote foi gerado com sucesso"
        btnText="Ir para Início"
        onClose={() => {
          nav.navigate('Home', {});
        }}
      />

      <Text>Analise as informações preenchidas antes de prosseguir</Text>

      <Text style={{marginTop: 10, fontWeight: '700', fontSize: 16}}>
        Formas de pagamento escolhidas
      </Text>

      <FlatList
        data={listLoteVendaIaItem}
        renderItem={({item}) => (
          <View style={{marginBottom: 10, flexDirection: 'row'}}>
            <Text style={{fontSize: 14}}>
              {GetDescricaoDoTipoRecebimento(item.tpRecebimento)}:{' '}
            </Text>
            <Text style={{fontSize: 14}}>
              {AppUtils.MoedaBrasileira(item.vrRecebimento as number)}
            </Text>
          </View>
        )}
      />

      <Text style={{marginTop: 10}}>WhatsApp para receber a nota</Text>
      <Text>{AppUtils.FormatarWhatsApp(whatsApp)}</Text>

      <CustomButton
        text="Confirmar e Gerar Nota"
        onClick={handleGerarNotas}
        isLoading={loading}
      />
    </View>

    // </AlertNotificationRoot>
  );
}
