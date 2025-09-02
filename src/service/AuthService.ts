import {AuthRequest, LoginResponse} from '../@types/Auth.types';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export class AuthService {
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
      console.error(error);
      throw new Error(error.message);
    }
  }

  public async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const {uid} = userCredential.user;

      const userDoc = await firestore().collection('users').doc(uid).get();

      if (!userDoc.exists) {
        throw new Error('Dados do usuário não encontrados no Firestore.');
      }

      const userData = userDoc.data();

      const loginResponse: LoginResponse = {
        user: {
          uid,
          nome: userData?.name || '',
          email: userData?.email || '',
          cartaoSus: userData?.cartao_sus || '',
        },
      };

      return loginResponse;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
