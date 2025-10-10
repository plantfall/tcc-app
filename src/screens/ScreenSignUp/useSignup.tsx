import {useContext, useState} from 'react';

import {SessionContext} from '../../context/SessionContext';
import {AuthService} from '../../service/AuthService';

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
    setErro('');

    if (isEmpty(nomeInput) || isEmpty(emailInput) || isEmpty(password)) {
      setLoading(false);
      return;
    }

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

export const isEmpty = (value: string) => {
  return value.trim() == '';
};
