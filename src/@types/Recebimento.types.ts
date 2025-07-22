export type DownloadNfeResponse = {
  nome: string;
  conteudo: string;
  extensao: string;
};

export type EnvioLoteResponse = {
  vrTotalRecebimentos: number;
  num: number;
};

export type ConsultaLoteResponse = {
  num: number;
  idLogin: number;
  idLoginUltAlteracao: number;
  idPartGer: number;
  uuid: string;
  status: LoteStatus;
  vrTotalRecebimentos: number;
  enviarNfe: boolean;
  enviarBandeira: boolean;
  whatsApp: string;
  origemGeracao: OrigemGeracao;
  listLoteVendaIaItem: VendaIaItem[];
  dtCriacao: number;
  dtUltModificacao: number;
};

export type LoteRecebimentoRequestDto = {
  enviarBandeira: boolean;
  enviarNfe: boolean;
  listLoteVendaIaItem: VendaIaItem[];
  origemGeracao: OrigemGeracao;
  whatsApp: string;
  uuid: string;
};

export type LoteRecebimento = {
  num: number;
  uuid: string;
  enviarNfe: boolean;
  enviarBandeira: boolean;
  whatsApp: string;
  origemGeracao: OrigemGeracao;
  listLoteVendaIaItem: VendaIaItem[];
  status: LoteStatus;
  vrTotalRecebimentos: number;
  idLogin: number;
  idLoginUltAlteracao: number;
  idPartGer: number;
  dtCriacao: number;
  dtUltModificacao: number;
  contadorModificacoes: number;
};

export type OrigemGeracao = {
  tpPlataforma: TpPlataforma;
  navegador: Navegador;
};

export type TpPlataforma = 'NAVEGADOR' | 'ANDROID' | 'IOS';

export type Navegador = {
  mobile: boolean;
  userAgent: string;
  platform: string;
  so: string;
};

export type LoteStatus =
  | 'SALVO'
  | 'PROCESSAMENTO'
  | 'CONCLUIDO'
  | 'FALHA_PROCESSAMENTO'
  | 'CANCELADO';

export type VendaIaItem = {
  id?: number;
  loteVendaIaId?: number;
  nfId?: null | number;
  nfStatus?: StatusNF;
  nfChave?: string | null;
  nfNum?: number | null;
  nfSerie?: string;
  modelo?: string;
  tpRecebimento: TipoRecebimento;
  tpBandeira: TpBandeira | null;
  vrRecebimento: number | null;
  uuid?: string;
  tentativaIa?: number;
  dtCriacao: number;
  dtUltModificacao: number;
};

export type StatusNF =
  | 'SALVA'
  | 'PROCESSAMENTO'
  | 'AUTORIZADA'
  | 'CANCELADA'
  | 'DENEGADA'
  | 'INUTILIZADA'
  | 'AUTORIZADA_CORRECAO'
  | 'ENVIADA';

export type TipoRecebimento =
  | 'DINHEIRO'
  | 'CHEQUE'
  | 'CARTAO_CRED'
  | 'CARTAO_DEB'
  | 'FATURA'
  | 'VALE_ALIMENTACAO'
  | 'VALE_REFEICAO'
  | 'VALE_PRESENTE'
  | 'VALE_COMBUSTIVEL'
  | 'DUPLICATA_MERCANTIL'
  | 'SEM_PAGAMENTO'
  | 'OUTROS'
  | 'ATIVO_PRODUTO'
  | 'DEPOSITO'
  | 'BOLETO'
  | 'DEPOSITO_BANCARIO'
  | 'PAGTO_INST'
  | 'TRANSF_BANCARIA'
  | 'PROGRAMA_FID'
  | 'TROCA'
  | 'FATURA_POSTERIOR'
  | 'CREDITO_CLIENTE'
  | 'PIX_ESTATICO';

export type TpBandeira =
  | 'VISA'
  | 'MASTER_CARD'
  | 'AMERICAN_EXPRESS'
  | 'SOROCRED'
  | 'DINERS_CLUB'
  | 'ELO'
  | 'HIPERCARD'
  | 'AURA'
  | 'CABAL'
  | 'OUTROS'
  | 'ALELO'
  | 'BANES_CARD'
  | 'CALC_CARD'
  | 'CREDZ'
  | 'DISCOVER'
  | 'GOODCARD'
  | 'GREENCARD'
  | 'HIPER'
  | 'JCB'
  | 'MAIS'
  | 'MAXVAN'
  | 'POLICARD'
  | 'REDECOMPRAS'
  | 'SODEXO'
  | 'VALECARD'
  | 'VEROCHEQUE'
  | 'VR'
  | 'TICKET';
