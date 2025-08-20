export type StatusErro = 401 | 500 | 404;

export type AuthRequest = {
  name: string;
  email: string;
  cartao_sus: string;
  password: string;
};

export type LoginResponse = {
  user: User;
};

export type User = {
  nome: string;
  cartaoSus: string;
  email: string;
  uid: string;
};
