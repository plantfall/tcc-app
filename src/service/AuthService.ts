import {
  validateLoginData,
  validateRegisterData,
} from '../validators/auth.validators';

import auth from '@react-native-firebase/auth';
import {AuthRequest} from '../@types/Auth.types';

export class AuthService {
  public async signUp(authRequest: AuthRequest): Promise<string> {
    try {
      validateRegisterData(authRequest);

      const userCredential = await auth().createUserWithEmailAndPassword(
        authRequest.email.trim(),
        authRequest.password.trim(),
      );
      return userCredential.user.uid;
    } catch (error: any) {
      throw this.tratarErro(error.message);
    }
  }

  public async login(email: string, password: string): Promise<string> {
    try {
      validateLoginData(email, password);
      const userCredential = await auth().signInWithEmailAndPassword(
        email.trim(),
        password.trim(),
      );

      return userCredential.user.uid;
    } catch (error: any) {
      throw this.tratarErro(error.message);
    }
  }

  public async resetPassword(email: string): Promise<void> {
    try {
      await auth().sendPasswordResetEmail(email.trim());
      console.log(`Email de redefinição enviado para: ${email}`);
    } catch (error: any) {
      throw this.tratarErro(error.message);
    }
  }

  public async deleteAccount(): Promise<void> {
    try {
      const user = auth().currentUser;

      if (user) {
        await user.delete();
        console.log('Usuário excluído do Auth com sucesso');
      }
    } catch (error: any) {
      console.error('Erro ao excluir conta:', error);
      throw new Error(error.message);
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
