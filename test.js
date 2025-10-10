const agora = new Date();
const daqui10Segundos = new Date(agora.getTime() + 10 * 1000);

const dia = daqui10Segundos.getDate();
const mes = daqui10Segundos.toLocaleString('pt-BR', {month: 'long'});
const ano = daqui10Segundos.getFullYear();
const horas = String(daqui10Segundos.getHours()).padStart(2, '0');
const minutos = String(daqui10Segundos.getMinutes()).padStart(2, '0');

const dataFormatada = `${dia} de ${mes} de ${ano}`;
const horarioMarcado = `${horas}:${minutos}`;

console.log(dataFormatada);
console.log(horarioMarcado);
