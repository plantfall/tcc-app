import {TpBandeira} from '../@types/Recebimento.types';

export function GetDescricaoDaBandeira(bandeira: TpBandeira) {
  return BandeiraDescricao[bandeira];
}

const BandeiraDescricao: Record<TpBandeira, string> = {
  VISA: 'Visa',
  MASTER_CARD: 'MasterCard',
  AMERICAN_EXPRESS: 'American Express',
  SOROCRED: 'Sorocred',
  DINERS_CLUB: 'Diners Club',
  ELO: 'Elo',
  HIPERCARD: 'Hipercard',
  AURA: 'Aura',
  CABAL: 'Cabal',
  OUTROS: 'Outras bandeiras',
  ALELO: 'Alelo',
  BANES_CARD: 'Banes Card',
  CALC_CARD: 'CalcCard',
  CREDZ: 'Credz',
  DISCOVER: 'Discover',
  GOODCARD: 'GoodCard',
  GREENCARD: 'GreenCard',
  HIPER: 'Hiper',
  JCB: 'JCB',
  MAIS: 'Mais!',
  MAXVAN: 'MaxVan',
  POLICARD: 'Policard',
  REDECOMPRAS: 'Rede Compras',
  SODEXO: 'Sodexo',
  VALECARD: 'ValeCard',
  VEROCHEQUE: 'Vero Cheque',
  VR: 'VR',
  TICKET: 'Ticket',
};
