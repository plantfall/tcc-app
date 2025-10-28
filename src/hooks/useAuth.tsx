import {useContext, useMemo, useState} from 'react';
import {AuthRequest, User} from '../@types/Auth.types';

import {SessionContext} from '../context/SessionContext';
import {AuthService} from '../service/AuthService';
import {UserService} from '../service/UserService';

export function useAuth() {
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [nomeInput, setNomeInput] = useState('');
  const [cartaoSusInput, setCartaoSusInput] = useState('');

  const {salvarUsuario} = useContext(SessionContext);

  // Instâncias dos serviços podem ser inicializadas uma única vez
  const authService = useMemo(() => new AuthService(), []);
  const userService = useMemo(() => new UserService(), []);

  // --- Handlers de Autenticação ---

  /**
   * Lógica unificada para cadastro de novo usuário (SignUp).
   */
  const handleSignUp = async () => {
    setLoading(true);
    setErro('');

    const authRequest: AuthRequest = {
      name: nomeInput.trim(),
      cartao_sus: cartaoSusInput.trim(),
      email: emailInput.trim(), // Use o estado comum de email/password
      password: password.trim(),
    };

    try {
      const uid = await authService.signUp(authRequest);
      const user: User = await userService.create(authRequest, uid);
      await salvarUsuario(user);
    } catch (e: any) {
      setErro(e.message || 'Erro desconhecido ao cadastrar.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Lógica unificada para login de usuário (Login).
   */
  const handleLogin = async () => {
    setLoading(true);
    setErro('');

    try {
      const uid = await authService.login(emailInput, password);
      const user: User = await userService.loadUser(uid);

      user.password = password;

      await salvarUsuario(user);
    } catch (e: any) {
      setErro(e.message || 'Erro desconhecido ao fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return {
    // --- Funções de Lógica ---
    handleSignUp,
    handleLogin,

    // --- Estados Comuns ---
    emailInput,
    setEmailInput,
    password,
    setPassword,
    isLoading,
    erro,
    showPassword,
    setShowPassword,

    // --- Estados Específicos do SignUp ---
    nomeInput,
    setNomeInput,
    cartaoSusInput,
    setCartaoSusInput,
  };
}
