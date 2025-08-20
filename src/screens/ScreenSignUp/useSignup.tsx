import {useContext, useState} from 'react';
import {AuthService} from '../../service/AuthService';
import {SessionContext} from '../../context/SessionContext';
import {AppUtils} from '../../utils/AppUtils';

export function useSignUp() {
  const [nomeInput, setNomeInput] = useState('Teste');
  const [cartaoSusInput, setCartaoSusInput] = useState('12345678910');

  const [emailInput, setEmailInput] = useState('teste1@gmail.com');

  const [password, setPassword] = useState('12345678');
  const [isLoading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {salvarUsuario} = useContext(SessionContext);
  const authService = new AuthService();

  const handleSignUp = async () => {
    setLoading(true);

    await authService
      .signUp({
        name: nomeInput,
        cartao_sus: cartaoSusInput,
        email: emailInput,
        password: password,
      })
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
    nomeInput,
    setNomeInput,
    cartaoSusInput,
    setCartaoSusInput,
    emailInput,
    setEmailInput,
    password,
    setPassword,
    handleSignUp,
    isLoading,
    erro,
    showPassword,
    setShowPassword,
  };
}
