import {useNavigation} from '@react-navigation/native';
import {useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PrefsType} from '../../@types/PrefsType';
import {useLocalDataHook} from '../../hooks/useLocalDataHook';

export function useHomeHook() {
  const [emitirNota, setEmitirNota] = useState(true);

  const {cfgVendaIa} = useLocalDataHook();

  const [informarBandeiraInput, setInformarBandeiraInput] = useState(false);

  const [receberNotaNoWhatsApp, setReceberNotaNoWhatsApp] = useState(true);

  const [whatsappInput, setWhatsappInput] = useState({
    masked: '',
    unmasked: '',
  });
  const navigation = useNavigation();

  const [whatsAppErro, setWhatsAppErrro] = useState('');

  const navega = async () => {
    setWhatsAppErrro('');

    if (whatsappInput.unmasked.trim() == '' && receberNotaNoWhatsApp) {
      setWhatsAppErrro('Você não informou seu WhatsApp');
      return;
    } else if (
      whatsappInput.unmasked.trim() != '' &&
      receberNotaNoWhatsApp &&
      whatsappInput.unmasked.length < 10
    ) {
      setWhatsAppErrro('O número informado é inválido');
      return;
    }

    navigation.navigate('ScreenTiposPagamento', {});
  };

  return {
    emitirNota,
    whatsappInput,
    informarBandeiraInput,
    receberNotaNoWhatsApp,
    setEmitirNota,
    setInformarBandeiraInput,
    setReceberNotaNoWhatsApp,
    setWhatsappInput,
    navega,
    whatsAppErro,
  };
}
