import firestore from '@react-native-firebase/firestore';

export function ConverterStringParaDataFormatoBrasileiroPorExtendo(
  dateString: string, // "2025-08-22"
): string {
  const [year, month, day] = dateString.split('-').map(Number);

  // Criar a data no fuso local sem depender do horário UTC
  const dateSelected = new Date(year, month - 1, day);

  const formatadoBR = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(dateSelected);

  console.log('data br');
  console.log(formatadoBR);

  return formatadoBR; // "22 de agosto de 2025"
}

export function ConverterMilisegundosParaDataFormatoBrasileiroPorExtendo(
  milissegundos: number,
): string {
  const dateSelected = new Date(milissegundos);

  const formatadoBR = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(dateSelected);

  console.log('data br');
  console.log(formatadoBR);

  return formatadoBR;
}

/**
 *
 * @param dataIso data como: '2025-08-28T00:00:00.000Z'
 * @returns data convertida como: 25 de março de 2025
 */

const meses = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

export function formatarDataPorExtenso(dataIso: string): string {
  const data = new Date(dataIso);

  const dia = data.getDate();
  const mes = meses[data.getMonth()];
  const ano = data.getFullYear();

  return `${dia} de ${mes} de ${ano}`;
}

export function formatarFirestoreDateParaDataIso(timestamp: {
  seconds: number;
  nanoseconds: number;
}): string {
  // converte para Date
  const date = new firestore.Timestamp(
    timestamp.seconds,
    timestamp.nanoseconds,
  ).toDate();

  // retorna no formato ISO (2025-08-28T00:00:00.000Z)
  return date.toISOString();
}
