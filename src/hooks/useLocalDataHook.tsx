import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import {CfgVendaIa, Partger} from '../@types/Auth.types';

export function useLocalDataHook() {
  const [fotoBase64, setFotoBase64] = useState<string | null>(null);
  const [user, setUser] = useState<Partger | null>(null);
  const [cfgVendaIa, setCfgVendaIa] = useState<CfgVendaIa | null>(null);

  useEffect(() => {
    const loadLocalData = async () => {
      try {
        console.log('em loadLocalData>>');
        const logo = await AsyncStorage.getItem('logo');
        console.log('fotoBase64: ' + logo);

        if (logo != null && logo != 'null') setFotoBase64(logo);

        const user_ = await AsyncStorage.getItem('user');
        console.log('user: ' + user_);

        if (user_ != null) setUser(JSON.parse(user_));

        const cfgVendaIa_ = await AsyncStorage.getItem('cfg_venda_ia');
        console.log('cfgVendaIa: ' + cfgVendaIa_);

        if (cfgVendaIa_ != null && cfgVendaIa_ != 'null')
          setCfgVendaIa(JSON.parse(cfgVendaIa_));
      } catch (e) {
        console.error('Erro ao dado do localstorage', e);
      }
    };

    loadLocalData();
  }, []);

  return {fotoBase64, user, cfgVendaIa};
}
