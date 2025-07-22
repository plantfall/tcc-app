import {TipoRecebimento} from '../@types/Recebimento.types';

export function GetDescricaoDoTipoRecebimento(
  tipoRecebimento: TipoRecebimento,
) {
  return TipoRecebimentoDescricao[tipoRecebimento];
}

const TipoRecebimentoDescricao: Record<TipoRecebimento, string> = {
  DINHEIRO: 'Dinheiro',
  CHEQUE: 'Cheque',
  CARTAO_CRED: 'Cartão de crédito',
  CARTAO_DEB: 'Cartão de débito',
  FATURA: 'Crédito lojista',
  VALE_ALIMENTACAO: 'Vale alimentação',
  VALE_REFEICAO: 'Vale refeição',
  VALE_PRESENTE: 'Vale presente',
  VALE_COMBUSTIVEL: 'Vale combustível',
  DUPLICATA_MERCANTIL: 'Duplicata mercantil',
  SEM_PAGAMENTO: 'Sem pagamento',
  OUTROS: 'Outros meios de pagamento',
  ATIVO_PRODUTO: 'Produto',
  DEPOSITO: 'Depósito',
  BOLETO: 'Boleto',
  DEPOSITO_BANCARIO: 'Depósito bancário',
  PAGTO_INST: 'PIX Dinâmico - QR Code / Maquininha',
  TRANSF_BANCARIA: 'Transferência bancária',
  PROGRAMA_FID: 'CashBack',
  TROCA: 'Troca',
  FATURA_POSTERIOR: 'Crédito lojista com faturamento',
  CREDITO_CLIENTE: 'Crédito de cliente',
  PIX_ESTATICO: 'PIX Estático / Transf. Conta',
};
