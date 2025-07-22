import {StorageLoteService} from '../../service/StorageLoteService';
import {RecebimentoService} from '../../service/RecebimentoService';
import {useContext, useState} from 'react';
import {Toast} from 'react-native-toast-notifications';

export default function ScreenConfimacaoHook() {
  const [popupSucessoVisible, setPopupSucessoVisible] = useState(false);
  const [popupErroVisible, setPopupErroVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  return {
    whatsApp,
    listLoteVendaIaItem,
    handleGerarNotas,
    popupSucessoVisible,
    loading,
  };
}
