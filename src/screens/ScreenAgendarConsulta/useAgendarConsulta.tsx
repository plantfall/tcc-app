import {useState} from 'react';

export type Especializacao =
  | 'CLINICO_GERAL'
  | 'MEDICO'
  | 'CLINICO_GERAL_PEDIATRA';

export type Especialista = {
  nome: string;
  especializacao: Especializacao;
  diasDisponiveis: string[];
};

export default function useAgendarConsulta() {
  const especialistas: Especialista[] = [
    {
      nome: 'Dra.Gabriela Garcia',
      especializacao: 'CLINICO_GERAL',
      diasDisponiveis: geraDiasDisponiveis(),
    },
    {
      nome: 'Dra.Isabel Matos',
      especializacao: 'CLINICO_GERAL_PEDIATRA',
      diasDisponiveis: geraDiasDisponiveis(4),
    },
  ];

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(new Date());

  const turnDatePickerOn = () => {
    setShowDatePicker(true);
  };

  const turnDatePickerOff = () => {
    setShowDatePicker(false);
  };

  return {
    especialistas,
    dateSelected,
    setDateSelected,
    showDatePicker,
    turnDatePickerOn,
    turnDatePickerOff,
  };
}

function geraDiasDisponiveis(qtdDias = 5): string[] {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();

  // Último dia do mês
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();

  // Gera todos os dias úteis do mês
  const diasUteis: string[] = [];
  for (let dia = hoje.getDate(); dia <= ultimoDia; dia++) {
    const dataAtual = new Date(ano, mes, dia);
    const diaSemana = dataAtual.getDay();
    if (diaSemana !== 0 && diaSemana !== 6) {
      const diaFormatado = `${String(dia).padStart(2, '0')}-${String(
        mes + 1,
      ).padStart(2, '0')}-${ano}`;
      diasUteis.push(diaFormatado);
    }
  }

  const diasAleatorios: string[] = [];
  const usados = new Set<string>();

  while (diasAleatorios.length < Math.min(qtdDias, diasUteis.length)) {
    const idx = Math.floor(Math.random() * diasUteis.length);
    const dia = diasUteis[idx];
    if (!usados.has(dia)) {
      usados.add(dia);
      diasAleatorios.push(dia);
    }
  }

  return diasAleatorios;
}
