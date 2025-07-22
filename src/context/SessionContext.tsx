import {createContext, ReactNode, useEffect, useState} from 'react';
import {AuthService} from '../service/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginResponse, StatusErro, User} from '../@types/Auth.types';

type SessionContextType = {
  user: User | undefined;
  signed: boolean;
  loading: boolean;
  token: string;
  salvarUsuario(loginResponse: LoginResponse): Promise<void>;
  sair(): Promise<void>;
};

type props = {
  children: ReactNode;
};

export const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType,
);

export default function SessionProvider({children}: props) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState<User | undefined>();
  const [signed, setSignIn] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function salvarUsuario(loginResponse: LoginResponse) {
    const userResponse = loginResponse.responseLogin.user;
    const tokenResponse = loginResponse.responseLogin.token;
    try {
      await AsyncStorage.setItem('@usuario', JSON.stringify(userResponse));
      await AsyncStorage.setItem('@token', tokenResponse);
    } catch (e) {
      console.log('erro ao salvar usuario');
    }
    setUser(userResponse);
    setToken(tokenResponse);
    setSignIn(true);
  }

  async function loadData() {
    const userResponse = await AsyncStorage.getItem('@usuario');
    const tokenResponse = await AsyncStorage.getItem('@token');

    if (userResponse != null) {
      const userResponse_: User = JSON.parse(userResponse);

      console.log('user......');
      console.log(userResponse_);
      setUser(userResponse_);
    }

    if (tokenResponse != null) {
      setToken(tokenResponse);
    }

    setLoading(false);
    setSignIn(userResponse != null);
  }

  async function sair() {
    await AsyncStorage.clear();

    setSignIn(false);
  }

  return (
    <SessionContext.Provider
      value={{
        signed,
        loading,
        sair,
        token,
        user,
        salvarUsuario,
      }}>
      {children}
    </SessionContext.Provider>
  );
}
