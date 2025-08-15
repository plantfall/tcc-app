import {useContext, useState} from 'react';
import {AuthService} from '../../service/AuthService';
import {SessionContext} from '../../context/SessionContext';

export function useLogin() {
  const [loginInput, setLoginInput] = useState('12345');
  const [password, setPassword] = useState('12345');
  const [isLoading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {salvarUsuario} = useContext(SessionContext);
  const authService = new AuthService();

  const handleLogin = async () => {
    setLoading(true);
    if (loginInput.trim().length == 0) {
      setLoading(false);
      return;
    }

    await authService
      .login(loginInput, password)
      .then(async r => {
        await salvarUsuario(r);
      })
      .catch(e => {
        const {status, message} = e;
        setErro(message);
        // if (status === 401) {
        //   setErro('Email ou senha inválidos');
        // } else if (status === 500) {
        //   setErro('Erro interno no servidor');
        // } else {
        //   setErro('Erro desconhecido');
        // }
      });

    setLoading(false);
  };

  return {
    loginInput,
    setLoginInput,
    password,
    setPassword,
    handleLogin,
    isLoading,
    erro,
    showPassword,
    setShowPassword,
  };
}
