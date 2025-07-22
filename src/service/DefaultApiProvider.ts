import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Partger} from '../@types/Auth.types';

export abstract class DefaultApiProvider {
  public token: string = '';
  public url: string = 'https://sgw.indentar.com.br/sgw_197_release/api/v1';
  public api: AxiosInstance;

  public static TEST_MODE = true;

  constructor() {
    this.api = axios.create({baseURL: this.url}); // default baseURL

    this.init();
  }

  protected async init() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        this.token = token;
        console.log('token recuperado', token);
      }

      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser: Partger = JSON.parse(user);
        console.log('partger recuperado', parsedUser);
      }

      const storedUrl = await AsyncStorage.getItem('@url');
      if (storedUrl && storedUrl.trim() !== '') {
        this.url = storedUrl;
        console.log('url recuperada', storedUrl);
        this.api = axios.create({baseURL: this.url});
      } else {
        console.log('usando url padrão:', this.url);
      }
    } catch (e) {
      console.log('Erro durante init:', e);
    }
  }

  protected header() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    };
  }
}
