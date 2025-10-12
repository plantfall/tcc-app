import {AuthRequest, User} from '../@types/Auth.types';
import {
  validarCamposObrigatorios,
  validarLimiteDeCaracteres,
} from '../validators/common.validator';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {validateRegisterData} from '../validators/auth.validators';

export class UserService {
  async create(authRequest: AuthRequest, uid: string) {
    validateRegisterData(authRequest);

    const user: User = {
      cartaoSus: authRequest.cartao_sus.trim(),
      email: authRequest.email.trim(),
      nome: authRequest.name.trim(),
      uid: uid.trim(),
      password: authRequest.password,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    try {
      await firestore().collection('users').doc(uid).set(user);
      return user;
    } catch (error: any) {
      throw error;
    }
  }

  async loadUser(userId: string): Promise<User> {
    try {
      const userDoc = await firestore().collection('users').doc(userId).get();

      if (!userDoc.exists) {
        throw new Error('Dados do usuário não encontrados no Firestore.');
      }

      const userData = userDoc.data() as User;

      return userData;
    } catch (error: any) {
      console.error('Erro ao carregar o usuário:', error);
      // Re-lança o erro para ser tratado pelo código chamador
      throw new Error('Falha ao carregar dados do usuário.');
    }
  }

  public async updatePasswordFromUserWithEmail(
    newPassword: string,
    email: string,
  ): Promise<void> {
    try {
      validarCamposObrigatorios({password: newPassword});
      validarLimiteDeCaracteres({
        password: {valor: newPassword, minimoDeCaracteres: 7},
      });

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
      throw error;
    }
  }

  public async updateCartaoSus(
    cartaoSus: string,
    userId: string,
  ): Promise<void> {
    try {
      const trimmedCartaoSus = cartaoSus.trim();
      const trimmedUserId = userId.trim();

      validarCamposObrigatorios({cartaoSus: cartaoSus, userId: userId});

      validarLimiteDeCaracteres({
        cartaoSus: {valor: cartaoSus, minimoDeCaracteres: 15},
        userId: {valor: userId, minimoDeCaracteres: 5},
      });

      await firestore().collection('users').doc(trimmedUserId).update({
        cartaoSus: trimmedCartaoSus,
        updatedAt: firestore.FieldValue.serverTimestamp(),
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

      throw error;
    }
  }

  async delete(userId: string): Promise<void> {
    try {
      await firestore().collection('users').doc(userId.trim()).update({
        deleted: true,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      throw error;
    }
  }
}
