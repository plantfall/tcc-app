import firestore from '@react-native-firebase/firestore';

export function ConverterDataParaFormatoBrasileiro(
  milissegundos: number,
): string {
  const data = new Date(milissegundos);

  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

/**
 *
 * @param dataIso data como: '2025-08-28T00:00:00.000Z'
 * @returns data convertida como: 25 de março de 2025
 */

export function formatarDataPorExtenso(dataIso: string): string {
  const data = new Date(dataIso);

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
