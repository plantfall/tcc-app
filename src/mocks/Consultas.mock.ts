import {Consulta, ConsultaResponse} from '../service/ConsultaService';

export const consultaMock: Consulta = {
  dataMarcada: '2025-08-28T00:00:00.000Z',
  especialista: {
    nome: 'Dra.Gabriela Garcia',
    especializacao: 'CLINICO_GERAL',
    diasDisponiveis: [
      '26-08-2025',
      '29-08-2025',
      '28-08-2025',
      '25-08-2025',
      '20-08-2025',
    ],
  },
  horarioMarcado: '09:00',
  status: 'AGENDADA',
};

export const consultasMock: ConsultaResponse[] = [
  {
    id: '2NJvAGWDoqZAKB9Phifg',
    dataMarcada: {
      seconds: 1756339200,
      nanoseconds: 0,
    },
    especialista: {
      diasDisponiveis: [
        '26-08-2025',
        '29-08-2025',
        '28-08-2025',
        '25-08-2025',
        '20-08-2025',
      ],
      nome: 'Dra.Gabriela Garcia',
      especializacao: 'CLINICO_GERAL',
    },
    horarioMarcado: '08:30',
    status: 'AGENDADA',
  },
  {
    id: '6vqM1RGpxPxuvhxqlFgj',
    dataMarcada: {
      seconds: 1756339200,
      nanoseconds: 0,
    },
    especialista: {
      diasDisponiveis: [
        '26-08-2025',
        '29-08-2025',
        '28-08-2025',
        '25-08-2025',
        '20-08-2025',
      ],
      nome: 'Dra.Gabriela Garcia',
      especializacao: 'CLINICO_GERAL',
    },
    horarioMarcado: '08:30',
    status: 'AGENDADA',
  },
  {
    id: 'V9OwowGhe3H3XOx9d9Ll',
    dataMarcada: {
      seconds: 1756339200,
      nanoseconds: 0,
    },
    especialista: {
      diasDisponiveis: [
        '26-08-2025',
        '29-08-2025',
        '28-08-2025',
        '25-08-2025',
        '20-08-2025',
      ],
      nome: 'Dra.Gabriela Garcia',
      especializacao: 'CLINICO_GERAL',
    },
    horarioMarcado: '08:00',
    status: 'AGENDADA',
  },
  {
    id: 'mjI571XskXwHCSzh4KuM',
    dataMarcada: {
      seconds: 1756339200,
      nanoseconds: 0,
    },
    especialista: {
      diasDisponiveis: [
        '26-08-2025',
        '29-08-2025',
        '28-08-2025',
        '25-08-2025',
        '20-08-2025',
      ],
      nome: 'Dra.Gabriela Garcia',
      especializacao: 'CLINICO_GERAL',
    },
    horarioMarcado: '09:00',
    status: 'AGENDADA',
  },
];
