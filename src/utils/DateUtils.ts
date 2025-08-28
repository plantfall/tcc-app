import firestore from '@react-native-firebase/firestore';

export function DataAlvoDadoEhValida(
  horarioAlvo: string,
  dataSelecionda: any,
): boolean {
  const agora = new Date();
  const options = {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const formatter = new Intl.DateTimeFormat('pt-BR', options);
  const horarioAtual = formatter.format(agora); // ex: "15:28"

  const minutosAlvo = paraMinutos(horarioAlvo);
  const minutosAtual = paraMinutos(horarioAtual);

  const timestampAgora = agora.getTime();
  const timestampSelecionado = dataSelecionda.timestamp;

  if (timestampSelecionado > timestampAgora) {
    return true;
  }

  // Se for o mesmo dia (ou mesmo minuto), compara os horários
  const dataSelecionadaString = dataSelecionda.dateString;

  const hoje = new Date();
  const hojeFormatado = formatarDataParaComparacao(hoje);

  const mesmaData = dataSelecionadaString === hojeFormatado;

  if (mesmaData) {
    return minutosAlvo > minutosAtual;
  }

  return false;
}

function formatarDataParaComparacao(data: Date): string {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`; // ex: "2025-08-28"
}

function paraMinutos(horario: string): number {
  const [hora, minuto] = horario.split(':').map(Number);
  return hora * 60 + minuto;
}

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
