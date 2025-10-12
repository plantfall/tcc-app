import {
  validarCamposObrigatorios,
  validarLimiteDeCaracteres,
} from './common.validator';

import {AuthRequest} from '../@types/Auth.types';
import {isEmpty} from '../utils/AppUtils';

export function validateRegisterData(authRequestDto: AuthRequest): void {
  const {email, password, cartao_sus, name} = authRequestDto;

  if (!isEmpty(cartao_sus)) {
    validarCamposObrigatorios({
      email: email,
      senha: password,
      name: name,
      cartao_sus: cartao_sus,
    });

    validarLimiteDeCaracteres({
      senha: {valor: password, minimoDeCaracteres: 7},

      name: {valor: name, minimoDeCaracteres: 4},
      email: {valor: email, minimoDeCaracteres: 10},
      cartao_sus: {valor: cartao_sus, minimoDeCaracteres: 15},
    });
  } else {
    validarCamposObrigatorios({
      email: email,
      senha: password,
      name: name,
    });

    validarLimiteDeCaracteres({
      senha: {valor: password, minimoDeCaracteres: 7},
      name: {valor: name, minimoDeCaracteres: 4},
      email: {valor: email, minimoDeCaracteres: 10},
    });
  }
}

export function validateLoginData(email: string, password: string): void {
  validarCamposObrigatorios({
    email: email,
    senha: password,
  });

  validarLimiteDeCaracteres({
    senha: {valor: password, minimoDeCaracteres: 7},
    email: {valor: email, minimoDeCaracteres: 10},
  });
}
