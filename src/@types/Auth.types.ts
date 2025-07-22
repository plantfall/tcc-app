export type StatusErro = 401 | 500 | 404;

export type LoginResponse = {
  responseLogin: {
    user: User;
    token: string;
  };
};

export type User = {
  nome: string;
};
