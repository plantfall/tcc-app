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
    status: 'AGENDADA',
    dataMarcada: {
      seconds: 1756339200,
      nanoseconds: 0,
    },
    horarioMarcado: '08:30',
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
  },
  {
    status: 'AGENDADA',
    dataMarcada: {
      seconds: 1756339200,
      nanoseconds: 0,
    },
    horarioMarcado: '08:30',
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
  },
  {
    status: 'AGENDADA',
    dataMarcada: {
      seconds: 1756339200,
      nanoseconds: 0,
    },
    horarioMarcado: '08:00',
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
  },
  {
    status: 'AGENDADA',
    dataMarcada: {
      seconds: 1756339200,
      nanoseconds: 0,
    },
    horarioMarcado: '09:00',
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
  },
];
