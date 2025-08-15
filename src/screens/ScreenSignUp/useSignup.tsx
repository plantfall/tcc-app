import {useContext, useState} from 'react';
import {AuthService} from '../../service/AuthService';
import {SessionContext} from '../../context/SessionContext';
import {AppUtils} from '../../utils/AppUtils';

export function useSignUp() {
  const [nomeInput, setNomeInput] = useState('');
  const [cartaoSusInput, setCartaoSusInput] = useState('');

  const [emailInput, setEmailInput] = useState('');

  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {salvarUsuario} = useContext(SessionContext);
  const authService = new AuthService();

  const handleSignUp = async () => {
    setLoading(true);

    if (!AppUtils.TestMode) {
      if (emailInput.trim().length == 0) {
        setLoading(false);
        return;
      }
    }

    setEmailInput('teste@teste.com');
    setCartaoSusInput('12345678910');
    setNomeInput('Teste da Silva');
    setPassword('123456789');

    await authService
      .login(emailInput, password)
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
