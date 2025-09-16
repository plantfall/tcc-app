import {useContext, useState} from 'react';
import {AuthService} from '../../service/AuthService';
import {SessionContext} from '../../context/SessionContext';

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

    if (
      isEmpty(nomeInput) ||
      // isEmpty(cartaoSusInput) ||
      isEmpty(emailInput) ||
      isEmpty(password)
      //|| cartaoSusInput.length < 15
    ) {
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

export const isEmpty = (value: string) => {
  return value.trim() == '';
};
