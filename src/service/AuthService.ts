import {AuthRequest, LoginResponse} from '../@types/Auth.types';
import {DefaultApiProvider} from './DefaultApiProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthService extends DefaultApiProvider {
  public async signUp(authRequest: AuthRequest): Promise<LoginResponse> {
    try {
      // 1️⃣ Cria o usuário no Firebase Auth
      const userCredential = await auth().createUserWithEmailAndPassword(
        authRequest.email,
        authRequest.password,
      );

      const {uid} = userCredential.user;

      // 2️⃣ Salva os dados do usuário no Firestore usando o UID como ID do documento
      await firestore().collection('users').doc(uid).set({
        name: authRequest.name,
        email: authRequest.email,
        cartao_sus: authRequest.cartao_sus,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      const loginResponse: LoginResponse = {
        user: {
          cartaoSus: authRequest.cartao_sus,
          email: authRequest.email,
          nome: authRequest.name,
          uid: uid,
        },
      };
      console.log(loginResponse);

      return loginResponse;
    } catch (error: any) {
      // Aqui você pode tratar erros específicos, como email já em uso
      throw new Error(error.message);
    }
  }

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
