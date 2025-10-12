import auth, {EmailAuthProvider} from '@react-native-firebase/auth';
import {
  validateLoginData,
  validateRegisterData,
} from '../validators/auth.validators';

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

  /**
   * Reautentica o usuário atual com e-mail e senha.
   * Isso deve ser feito antes de operações sensíveis como deleteAccount ou updatePassword.
   */
  public async reauthenticate(email: string, password: string): Promise<void> {
    const user = auth().currentUser;

    if (!user || !email || !password) {
      throw new Error('Usuário não logado ou credenciais ausentes.');
    }

    // 1. Cria a credencial de reautenticação
    const credential = EmailAuthProvider.credential(
      email.trim(),
      password.trim(),
    );

    try {
      // 2. Tenta reautenticar o usuário atual
      await user.reauthenticateWithCredential(credential);
      console.log('Usuário reautenticado com sucesso.');
    } catch (error: any) {
      console.error('Erro na reautenticação:', error);
      throw this.tratarErro(error.message); // Use seu método de tratamento de erro
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
