import {createContext, ReactNode, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginResponse, User} from '../@types/Auth.types';

type SessionContextType = {
  user: User | undefined;
  signed: boolean;
  loading: boolean;
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
  const [signed, setSignIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    //sair();
    setLoading(false);
  }, []);

  async function salvarUsuario(loginResponse: LoginResponse) {
    await saveDataLocal(loginResponse);
    const userResponse = loginResponse.user;

    setUser(userResponse);
    setSignIn(true);
  }

  async function saveDataLocal(authResponse: LoginResponse) {
    await AsyncStorage.setItem('@user', JSON.stringify(authResponse.user));
    console.log('salvou');
  }

  async function loadData() {
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
      }}>
      {children}
    </SessionContext.Provider>
  );
}
