import {Especialista} from '../screens/ScreenAgendarConsulta/useAgendarConsulta';
import firestore from '@react-native-firebase/firestore';
import {formatarFirestoreDateParaDataIso} from '../utils/DateUtils';
import {AppUtils} from '../utils/AppUtils';
import {consultasMock} from '../mocks/Consultas.mock';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationService from './NotificationService';

export type Status = 'AGENDADA' | 'CANCELADA' | 'CONCLUIDA' | 'REAJENDADA';
export type Consulta = {
  id?: string;
  especialista: Especialista;
  dataMarcadaMilisegundos: number;
  dataFormatada: string;
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

      const data = await firestore()
        .collection('users')
        .doc(uidUser)
        .collection('consultas')
        .add(consultaRequest);

      consultaRequest.id = data.id;

      await this.saveConsultaLocally(consultaRequest);

      console.log('agendou');
    } catch (error: any) {
      throw new Error(error.message);
    }
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

  public async buscaProximaConsulta(): Promise<Consulta | null> {
    try {
      const consultas = await this.fetchConsultasLocally();

      if (!consultas || consultas.length === 0) {
        return null;
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

      if (futuras.length === 0) return null;

      futuras.sort((a, b) => {
        const dataA = this.parseDataHora(a.dataFormatada, a.horarioMarcado);
        const dataB = this.parseDataHora(b.dataFormatada, b.horarioMarcado);
        return dataA.getTime() - dataB.getTime();
      });

      return futuras[0];
    } catch (error) {
      console.error('Erro ao buscar próxima consulta:', error);
      return null;
    }
  }

  public async notificarProximaConsulta() {
    const consulta = await this.buscaProximaConsulta();
    if (!consulta) return;

    const dataConsulta = this.parseDataHora(
      consulta.dataFormatada,
      consulta.horarioMarcado,
    );

    // Notificar imediatamente ao abrir o app
    NotificationService.showNotification(
      'Consulta agendada',
      `Você tem consulta com ${consulta.especialista.nome} em ${consulta.dataFormatada} às ${consulta.horarioMarcado}`,
    );
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
