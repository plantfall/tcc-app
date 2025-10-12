import {ReactNode, createContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../@types/Auth.types';
import {ConsultaService} from '../service/ConsultaService';

type SessionContextType = {
  user: User | undefined;
  signed: boolean;
  loading: boolean;
  salvarUsuario(user: User): Promise<void>;
  sair(): Promise<void>;
  updateCartaoSus(email: string): Promise<void>;
  modoDesenvolvedor: boolean;
  setModoDesenvolvedor: React.Dispatch<React.SetStateAction<boolean>>;
  segundosParaAgendarConsultaEmDevMode: string;
  setSegundosParaAgendarConsultaEmDevMode: React.Dispatch<
    React.SetStateAction<string>
  >;
};

type props = {
  children: ReactNode;
};

export const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType,
);

export default function SessionProvider({children}: props) {
  const [user, setUser] = useState<User | undefined>();
  const [signed, setSignIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modoDesenvolvedor, setModoDesenvolvedor] = useState(false);
  const [
    segundosParaAgendarConsultaEmDevMode,
    setSegundosParaAgendarConsultaEmDevMode,
  ] = useState('0');

  useEffect(() => {
    loadData();
    //sair();
    setLoading(false);
  }, []);

  async function salvarUsuario(user: User) {
    await saveDataLocal(user);

    setUser(user);
    setSignIn(true);
  }

  async function updateCartaoSus(cartaoSus: string) {
    if (user != undefined) {
      const updatedUser: User = {
        ...user,
        cartaoSus: cartaoSus,
      };

      setUser(updatedUser);

      await AsyncStorage.setItem('@user', JSON.stringify(updatedUser));
      console.log('atualizou');
    }
  }

  async function saveDataLocal(user: User) {
    await AsyncStorage.setItem('@user', JSON.stringify(user));
    console.log('salvou');

    const consulta = new ConsultaService();
    await consulta.fetchConsultas(user.uid);
  }

  async function loadData() {
    //await AsyncStorage.removeItem('@consultas');
    const userData = await AsyncStorage.getItem('@user');

    if (userData != null) {
      const userResponse_: User = JSON.parse(userData);

      console.log('user......');
      console.log(userResponse_);
      setUser(userResponse_);
    }

    setLoading(false);
    setSignIn(userData != null);
  }

  async function sair() {
    await AsyncStorage.clear();
    setModoDesenvolvedor(false);
    setSegundosParaAgendarConsultaEmDevMode('0');

    setSignIn(false);
  }

  return (
    <SessionContext.Provider
      value={{
        signed,
        loading,
        sair,
        user,
        salvarUsuario,
        updateCartaoSus,
        modoDesenvolvedor,
        setModoDesenvolvedor,
        segundosParaAgendarConsultaEmDevMode,
        setSegundosParaAgendarConsultaEmDevMode,
      }}>
      {children}
    </SessionContext.Provider>
  );
}
