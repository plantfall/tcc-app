import {LoginResponse} from '../@types/Auth.types';
import {DefaultApiProvider} from './DefaultApiProvider';

export class AuthService extends DefaultApiProvider {
  public async login(email: string, password: string): Promise<LoginResponse> {
    return {
      responseLogin: {
        user: {
          nome: 'Teste da Silva',
          cartaoSus: '12345678910',
        },
        token: '',
      },
    };
    //throw {status: 500, message: 'Erro inesperado no login'};
  }
}
