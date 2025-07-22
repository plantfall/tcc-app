import {
  ConsultaLoteResponse,
  LoteRecebimento,
} from '../@types/Recebimento.types';

export function ConsultaLoteResponseToLoteRecebimento(
  loteConsulta: ConsultaLoteResponse,
): LoteRecebimento {
  const {
    vrTotalRecebimentos,
    dtCriacao,
    dtUltModificacao,
    enviarBandeira,
    enviarNfe,
    idLogin,
    idLoginUltAlteracao,
    idPartGer,
    listLoteVendaIaItem,
    num,
    origemGeracao,
    status,
    uuid,
    whatsApp,
  } = loteConsulta;

  return {
    enviarBandeira,
    enviarNfe,
    listLoteVendaIaItem,
    whatsApp,
    status,
    uuid,
    origemGeracao,
    num,
    vrTotalRecebimentos,
    idLogin,
    idLoginUltAlteracao,
    idPartGer,
    dtCriacao,
    dtUltModificacao,
    contadorModificacoes: 0,
  };
}
