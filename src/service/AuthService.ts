import {AuthRequest, LoginResponse} from '../@types/Auth.types';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export class AuthService {
  public async signUp(authRequest: AuthRequest): Promise<LoginResponse> {
    try {
      this.validarCadastro(authRequest);
      // 1️⃣ Cria o usuário no Firebase Auth
      const userCredential = await auth().createUserWithEmailAndPassword(
        authRequest.email.trim(),
        authRequest.password.trim(),
      );

      const {uid} = userCredential.user;

      // 2️⃣ Salva os dados do usuário no Firestore usando o UID como ID do documento
      await firestore().collection('users').doc(uid).set({
        name: authRequest.name.trim(),
        email: authRequest.email.trim(),
        cartao_sus: authRequest.cartao_sus.trim(),
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      const loginResponse: LoginResponse = {
        user: {
          cartaoSus: authRequest.cartao_sus,
          email: authRequest.email.trim(),
          nome: authRequest.name.trim(),
          uid: uid,
        },
      };
      console.log(loginResponse);

      return loginResponse;
    } catch (error: any) {
      throw this.tratarErro(error.message);
    }
  }

  private validarCadastro(authRequest: AuthRequest) {
    if (authRequest.name.length < 7) {
      throw new Error('O nome está muito curto.');
    }
  }

  public async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email.trim(),
        password.trim(),
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
      throw this.tratarErro(error.message);
    }
  }

  public async resetPassword(email: string): Promise<void> {
    try {
      this.validarEmail(email);

      const userSnapshot = await firestore()
        .collection('users')
        .where('email', '==', email.trim())
        .get();

      if (userSnapshot.empty) {
        throw new Error('Este email não está cadastrado.');
      }

      await auth().sendPasswordResetEmail(email.trim());
      console.log(`Email de redefinição enviado para: ${email}`);
    } catch (error: any) {
      throw this.tratarErro(error.message);
    }
  }

  private validarEmail(email: string) {
    if (email.trim().length < 10 || !email.trim().includes('@')) {
      throw new Error('Email inválido');
    }
  }

  public async updateCartaoSus(
    cartaoSus: string,
    userId: string,
  ): Promise<void> {
    try {
      const trimmedCartaoSus = cartaoSus.trim();
      const trimmedUserId = userId.trim();

      // 1. Validação básica (opcional, mas recomendada)
      if (!trimmedUserId) {
        throw new Error('ID do usuário é obrigatório.');
      }
      if (trimmedCartaoSus.length !== 15 && trimmedCartaoSus.length !== 0) {
        // O SUS tem 15 dígitos. Você pode ajustar a validação se necessário.
        throw new Error('Número do Cartão SUS inválido. Deve ter 15 dígitos.');
      }

      await firestore().collection('users').doc(trimmedUserId).update({
        cartao_sus: trimmedCartaoSus,
        updatedAt: firestore.FieldValue.serverTimestamp(), // Adiciona um timestamp de atualização (opcional)
      });

      console.log(
        `Cartão SUS do usuário ${trimmedUserId} atualizado com sucesso.`,
      );
    } catch (error: any) {
      // Se o documento não existir, o Firestore lança um erro.
      if (error.code === 'firestore/not-found') {
        throw new Error(
          'Usuário não encontrado no banco de dados para a atualização.',
        );
      }
      // Usa sua função de tratamento de erro para lidar com outros possíveis erros.
      throw this.tratarErro(error.message);
    }
  }

  private tratarErro(errorMessage: string) {
    console.log(errorMessage);
    console.log(errorMessage.includes('auth/invalid-credential'));
    let newMessage = errorMessage;

    if (errorMessage.includes('auth/invalid-credential'))
      newMessage = 'Não foi possível fazer login, verifique o email e a senha';
    else if (
      errorMessage.includes(
        '[auth/invalid-email] The email address is badly formatted.',
      )
    )
      newMessage = 'O email é inválido';
    else if (errorMessage.includes('auth/email-already-in-use'))
      newMessage = 'O email já está em uso.';
    else if (errorMessage.includes('auth/weak-password'))
      newMessage = 'A senha deve ter pelo menos 6 caracteres.';
    else if (errorMessage.includes('auth/user-not-found'))
      newMessage = 'Usuário não encontrado com esse email.';

    throw new Error(newMessage);
  }
}
