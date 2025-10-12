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
  password: string;
  email: string;
  uid: string;
  createdAt?: FirebaseFirestoreTypes.FieldValue;
};
