import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginResponse} from '../@types/Auth.types';

export class StorageService {
  async saveDataAfterLogin(loginResponse: LoginResponse) {
    console.log('em saveDataAfterLogin, exibindo loginResponse: >>');
    console.log(loginResponse);
    const {bearerToken, partGer, logoBase64, cfgVendaIa} =
      loginResponse.responseLogin;

    console.log('partger');
    console.log(partGer);

    try {
      await AsyncStorage.setItem('token', bearerToken);
      await AsyncStorage.setItem('user', JSON.stringify(partGer));
      await AsyncStorage.setItem('logo', JSON.stringify(logoBase64));
      await AsyncStorage.setItem('cfg_venda_ia', JSON.stringify(logoBase64));
      console.log('salvou todos dados no storage....');
    } catch (error) {
      throw new Error('erro ao salvar info do usuariuo: ' + error);
    }
  }
}
