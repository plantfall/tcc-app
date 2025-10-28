import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type AuthRequest = {
  name: string;
  email: string;
  cartao_sus: string;
  password: string;
};

export type User = {
  nome: string;
  cartaoSus: string;
  senha: string;
  email: string;
  uid: string;
  dtCriacao: FirebaseFirestoreTypes.FieldValue;
};
