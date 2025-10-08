import AsyncStorage from '@react-native-async-storage/async-storage';
import {Especialista} from '../screens/ScreenAgendarConsulta/useAgendarConsulta';
import {NotificationService} from './NotificationService';
import firestore from '@react-native-firebase/firestore';

export type Status = 'AGENDADA' | 'CANCELADA' | 'CONCLUIDA' | 'REAJENDADA';
export type Consulta = {
  id?: string;
  especialista: Especialista;
  dataMarcadaMilisegundos: number;
  /**
   * Possui o formato: dd de mês de yyyy
   * Exemplo de data formatada: '25 de agosto de 2025'
   */
  dataFormatada: string;

  /**
   * Possui o formato: hh:mm
   * Exemplo: '13:08'
   */
  horarioMarcado: string;
  status: Status;
};

export type FirestoreTimestamp = {
  seconds: number;
  nanoseconds: number;
};

export class ConsultaService {
  public async agendarConsulta(
    uidUser: string,
    consultaRequest: Consulta,
  ): Promise<void> {
    try {
      consultaRequest.status = 'AGENDADA';

      console.log(consultaRequest);

      const consultaRef = await firestore()
        .collection('users')
        .doc(uidUser)
        .collection('consultas')
        .add(consultaRequest);

      const id = consultaRef.id;

      await consultaRef.update({id: id});
      consultaRequest.id = id;

      await this.saveConsultaLocally(consultaRequest);

      //consultaRequest.dataFormatada = '08 de outubro de 2025';

      //consultaRequest.horarioMarcado = '13:35';

      let dataFormatadaFinal = this.formatConsultaDate(
        consultaRequest.dataFormatada,
        consultaRequest.horarioMarcado,
      );

      console.log('data formatada final: ' + dataFormatadaFinal);

      NotificationService.ScheduleNotification(
        'Agendamento de Consulta',
        `Com médico ${consultaRequest.especialista.nome} sobre ${consultaRequest.especialista.especializacao}`,
        dataFormatadaFinal,
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private formatConsultaDate(
    dataFormatada: string,
    horarioMarcado: string,
  ): string {
    const meses: Record<string, string> = {
      janeiro: '01',
      fevereiro: '02',
      março: '03',
      abril: '04',
      maio: '05',
      junho: '06',
      julho: '07',
      agosto: '08',
      setembro: '09',
      outubro: '10',
      novembro: '11',
      dezembro: '12',
    };

    const [diaStr, de, mesStr, de_, anoStr] = dataFormatada.split(' ');
    const dia = diaStr.padStart(2, '0');
    const mes = meses[mesStr.toLowerCase()];
    const ano = anoStr;

    const dataFinal = `${ano}-${mes}-${dia} ${horarioMarcado}`;
    return dataFinal;
  }

  public async fetchConsultas(uidUser: string): Promise<Consulta[]> {
    try {
      const fetchedToday = await this.consultasAlreadyFetchToday();
      console.log('fet: ' + fetchedToday);

      if (fetchedToday) {
        return await this.fetchConsultasLocally();
      }

      const snapshot = await firestore()
        .collection('users')
        .doc(uidUser)
        .collection('consultas')
        .get();

      let consultas: Consulta[] = snapshot.docs.map(doc => {
        const data = doc.data() as Consulta;

        return data;
      });

      console.log(consultas);
      await this.saveConsultasLocally(consultas);
      await this.turnOnAlreadyFetchToday();

      return consultas;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async cancelarConsulta(
    uidUser: string,
    consultaId: string,
  ): Promise<boolean> {
    try {
      console.log(consultaId);

      const consultaRef = firestore()
        .collection('users')
        .doc(uidUser)
        .collection('consultas')
        .doc(consultaId);

      await consultaRef.update({status: 'CANCELADA'});

      const consultas = await this.fetchConsultasLocally();
      // acha a consulta pelo id
      const consulta = consultas.find(c => c.id === consultaId);

      if (consulta) {
        // atualiza o status
        consulta.status = 'CANCELADA';
        // atualiza localmente
        await this.updateConsultaLocally(consulta);
      }

      console.log(`Consulta ${consultaId} cancelada com sucesso`);
      return true;
    } catch (error: any) {
      console.error('Erro ao cancelar consulta:', error.message);
      return false;
    }
  }

  public async editarConsulta(
    uidUser: string,
    consulta: Consulta,
  ): Promise<boolean> {
    try {
      const consultaRef = firestore()
        .collection('users')
        .doc(uidUser)
        .collection('consultas')
        .doc(consulta.id);

      console.log('consulta id: ' + consulta.id);

      await consultaRef.update({
        dataFormatada: consulta.dataFormatada,
        dataMarcada: consulta.dataMarcadaMilisegundos,
        horarioMarcado: consulta.horarioMarcado,
      });

      await this.updateConsultaLocally(consulta);

      console.log(`Consulta atualizada com sucesso`);
      return true;
    } catch (error: any) {
      console.error('Erro ao cancelar consulta:', error.message);
      return false;
    }
  }

  private async consultasAlreadyFetchToday(): Promise<boolean> {
    const data = await AsyncStorage.getItem('@consultas_already_fetch_today');

    if (data == null) return false;

    const parse: ALreadyFetch = JSON.parse(data);

    const today: string = `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;

    console.log(today);
    console.log(parse.day_stored);

    return parse.day_stored == today;
  }

  private async turnOnAlreadyFetchToday(): Promise<void> {
    const today: string = `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;

    const data: ALreadyFetch = {
      day_stored: today,
    };

    await AsyncStorage.setItem(
      '@consultas_already_fetch_today',
      JSON.stringify(data),
    );
  }

  private async saveConsultasLocally(consultas: Consulta[]): Promise<void> {
    await AsyncStorage.setItem('@consultas', JSON.stringify(consultas));
    console.log('adicionou consultas localmente');
  }

  private async saveConsultaLocally(consulta: Consulta): Promise<void> {
    const consultas: Consulta[] = await this.fetchConsultasLocally();

    consultas.unshift(consulta);

    await AsyncStorage.setItem('@consultas', JSON.stringify(consultas));
    console.log('adicionou localmente');
  }

  private async fetchConsultasLocally(): Promise<Consulta[]> {
    const data = await AsyncStorage.getItem('@consultas');

    const consultas: Consulta[] = data == null ? [] : JSON.parse(data);

    return consultas;
  }

  private async updateConsultaLocally(consulta: Consulta): Promise<void> {
    const consultas: Consulta[] = await this.fetchConsultasLocally();

    const index = consultas.findIndex(c => c.id === consulta.id);

    if (index !== -1) {
      // substitui pelos novos dados
      consultas[index] = consulta;
      console.log(`Consulta ${consulta.id} atualizada localmente`);
    } else {
      // se não existir, pode optar por adicionar
      consultas.unshift(consulta);
      console.log(
        `Consulta ${consulta.id} não encontrada, adicionada localmente`,
      );
    }

    // salva de volta no AsyncStorage
    await this.saveConsultasLocally(consultas);
  }

  public async buscarProximasConsultas(): Promise<Consulta[]> {
    try {
      const consultas = await this.fetchConsultasLocally();

      if (!consultas || consultas.length === 0) {
        return [];
      }

      const agora = Date.now();

      const futuras = consultas.filter(c => {
        if (c.status === 'CANCELADA') return false;

        const dataConsulta = this.parseDataHora(
          c.dataFormatada,
          c.horarioMarcado,
        );

        return dataConsulta.getTime() >= agora;
      });

      if (futuras.length === 0) return [];

      futuras.sort((a, b) => {
        const dataA = this.parseDataHora(a.dataFormatada, a.horarioMarcado);
        const dataB = this.parseDataHora(b.dataFormatada, b.horarioMarcado);
        return dataA.getTime() - dataB.getTime();
      });

      return futuras;
    } catch (error) {
      console.error('Erro ao buscar próxima consulta:', error);
      return [];
    }
  }

  public async notificarProximasConsultas() {
    const consultas = await this.buscarProximasConsultas();
    if (consultas.length == 0) return;

    consultas.forEach(consulta => {
      // Notificar imediatamente ao abrir o app
      NotificationService.showNotification(
        'Consulta agendada',
        `Você tem consulta com ${consulta.especialista.nome} em ${consulta.dataFormatada} às ${consulta.horarioMarcado}`,
      );
    });
  }

  // Utilitário privado para montar Date a partir do formato "25 de agosto de 2025"
  private parseDataHora(dataFormatada: string, horario: string): Date {
    // Exemplo: "25 de agosto de 2025"
    const [dia, _, resto] = dataFormatada.split(' ', 3);
    const [mesNome, ano] = dataFormatada
      .replace(`${dia} de `, '')
      .split(' de ');

    const meses: Record<string, number> = {
      janeiro: 0,
      fevereiro: 1,
      março: 2,
      abril: 3,
      maio: 4,
      junho: 5,
      julho: 6,
      agosto: 7,
      setembro: 8,
      outubro: 9,
      novembro: 10,
      dezembro: 11,
    };

    const mes = meses[mesNome.toLowerCase()];
    const diaNum = parseInt(dia, 10);
    const anoNum = parseInt(ano, 10);

    const [hora, minuto] = horario.split(':').map(Number);

    const d = new Date(anoNum, mes, diaNum, hora, minuto, 0, 0);
    return d;
  }

  public notificarProximaConsultaMock() {
    // Mock da consulta
    const consulta = {
      especialista: {nome: 'Dr. Mock'},
      dataFormatada: '', // preenchido abaixo
      horarioMarcado: '10:00',
    };

    // Data de amanhã
    const dataAmanha = new Date();
    dataAmanha.setDate(dataAmanha.getDate() + 1);
    consulta.dataFormatada = dataAmanha.toLocaleDateString('pt-BR');

    // Notificação imediata ao abrir o app
    NotificationService.showNotification(
      'Consulta agendada',
      `Você tem consulta com ${consulta.especialista.nome} em ${consulta.dataFormatada} às ${consulta.horarioMarcado}`,
    );
  }
}

type ALreadyFetch = {
  //dia que fez o fetch
  day_stored: string;
};
