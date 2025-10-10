import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {Especialista} from '../screens/ScreenAgendarConsulta/useAgendarConsulta';
import {NotificationService} from './NotificationService';

export type Status = 'AGENDADA' | 'CANCELADA' | 'CONCLUIDA' | 'REAJENDADA';
export type NotificacaoData = {
  id: string;
  ativa: boolean;
};
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

  notificacaoUmDiaAntes: NotificacaoData;
  notificacao10MinAntes: NotificacaoData;
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
      //await this.validarConsulta(consultaRequest);
      // const seg = 120;

      // consultaRequest.dataFormatada =
      //   this.gerarDataFormatadaHojeDaquiXSegundos(seg);
      // consultaRequest.horarioMarcado = this.gerarHorarioDaquiXsegundos(seg);

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

      let dataFormatadaFinal = this.formatConsultaDate(
        consultaRequest.dataFormatada,
        consultaRequest.horarioMarcado,
      );

      // Converter a string no formato "YYYY-MM-DD HH:mm" para objeto Date
      const [dataPart, horaPart] = dataFormatadaFinal.split(' ');
      const [ano, mes, dia] = dataPart.split('-').map(Number);
      const [hora, minuto] = horaPart.split(':').map(Number);
      const dataFinal = new Date(ano, mes - 1, dia, hora, minuto);

      // Gerar horários com antecedência
      const dezMinAntes = new Date(dataFinal.getTime() - 10 * 60 * 1000);
      const umDiaAntes = new Date(dataFinal.getTime() - 24 * 60 * 60 * 1000);

      // Converter de volta pro formato "YYYY-MM-DD HH:mm"
      const formatarData = (d: Date) =>
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          '0',
        )}-${String(d.getDate()).padStart(2, '0')} ${String(
          d.getHours(),
        ).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

      const titulo = 'Agendamento de Consulta';

      const mensagem = `Com ${consultaRequest.especialista.nome} dia ${consultaRequest.dataFormatada} às ${consultaRequest.horarioMarcado}`;

      const strUmDiaAntes = formatarData(umDiaAntes);
      // Notificação 1 dia antes
      const idNotificacaoUmDiaAntes =
        await NotificationService.ScheduleNotification(
          titulo,
          mensagem,
          uidUser,
          strUmDiaAntes,
        );

      const strDezMinANtes = formatarData(dezMinAntes);

      // Notificação 10 minutos antes
      const idNotificacao10minAntes =
        await NotificationService.ScheduleNotification(
          titulo,
          mensagem,
          uidUser,
          strDezMinANtes,
        );

      consultaRequest.notificacaoUmDiaAntes = {
        ativa: true,
        id: idNotificacaoUmDiaAntes,
      };

      consultaRequest.notificacao10MinAntes = {
        ativa: true,
        id: idNotificacao10minAntes,
      };

      await this.saveConsultaLocally(consultaRequest);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private gerarDataFormatadaHojeDaquiXSegundos(segundos: number): string {
    const agora = new Date();
    const daquiXSegundos = new Date(agora.getTime() + segundos * 1000);

    const dia = daquiXSegundos.getDate();
    const mes = daquiXSegundos.toLocaleString('pt-BR', {month: 'long'});
    const ano = daquiXSegundos.getFullYear();

    const dataFormatada = `${dia} de ${mes} de ${ano}`;

    console.log(dataFormatada);
    return dataFormatada;
  }

  private gerarHorarioDaquiXsegundos(segundos: number): string {
    const agora = new Date();
    const daquiXSegundos = new Date(agora.getTime() + segundos * 1000);

    const horas = String(daquiXSegundos.getHours()).padStart(2, '0');
    const minutos = String(daquiXSegundos.getMinutes()).padStart(2, '0');

    const horarioMarcado = `${horas}:${minutos}`;
    console.log(horarioMarcado);

    return horarioMarcado;
  }

  private async validarConsulta(consulta: Consulta): Promise<void> {
    const consultas = await this.listarConsultasAgendadas();

    //um unico agendamento por dia por horario
    const horarioJaMArcado = consultas.find(
      it =>
        it.dataFormatada === consulta.dataFormatada &&
        it.horarioMarcado === consulta.horarioMarcado,
    );

    if (horarioJaMArcado !== undefined)
      throw new Error('Você já possui um agendamento marcado nesse horário');

    //um unico agendamento por dia por especialista
    const jaMarcada = consultas.find(
      it =>
        it.especialista.nome === consulta.especialista.nome &&
        it.especialista.especializacao ===
          consulta.especialista.especializacao &&
        it.dataFormatada === consulta.dataFormatada,
    );

    if (jaMarcada !== undefined)
      throw new Error(
        'Não é possível realizar múltiplos agendamentos com o mesmo médico em um único dia.',
      );
  }

  private async fetchConsultasLocally(): Promise<Consulta[]> {
    const data = await AsyncStorage.getItem('@consultas');

    const consultas: Consulta[] = data == null ? [] : JSON.parse(data);

    return consultas;
  }

  private async listarConsultasAgendadas(): Promise<Consulta[]> {
    const consultas = await this.fetchConsultasLocally();

    return consultas.filter(it => it.status == 'AGENDADA');
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
  ): Promise<void> {
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
        consulta.notificacao10MinAntes.ativa = false;
        consulta.notificacaoUmDiaAntes.ativa = false;
        // atualiza localmente
        await this.updateConsultaLocally(consulta);
        await NotificationService.CancelarNotificaoAgendada(
          consulta?.notificacaoUmDiaAntes.id!!,
        );
        await NotificationService.CancelarNotificaoAgendada(
          consulta?.notificacao10MinAntes.id!!,
        );

        console.log(`Consulta ${consultaId} cancelada com sucesso`);
      }
    } catch (error: any) {
      const message = error.message;
      console.log(message);
      throw new Error('Erro ao cancelar consulta: ' + error.message);
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

  /** @deprecated */
  public async buscarProximasConsultas(): Promise<Consulta[]> {
    try {
      const consultas = await this.fetchConsultasLocally();

      if (!consultas || consultas.length === 0) {
        return [];
      }

      const agora = Date.now();

      const futuras = consultas.filter(c => {
        if (c.status === 'CANCELADA') return false;

        const dataConsulta = ConsultaService.ParseDataHora(
          c.dataFormatada,
          c.horarioMarcado,
        );

        return dataConsulta.getTime() >= agora;
      });

      if (futuras.length === 0) return [];

      futuras.sort((a, b) => {
        const dataA = ConsultaService.ParseDataHora(
          a.dataFormatada,
          a.horarioMarcado,
        );
        const dataB = ConsultaService.ParseDataHora(
          b.dataFormatada,
          b.horarioMarcado,
        );
        return dataA.getTime() - dataB.getTime();
      });

      return futuras;
    } catch (error) {
      console.error('Erro ao buscar próxima consulta:', error);
      return [];
    }
  }

  // Utilitário privado para montar Date a partir do formato "25 de agosto de 2025"
  public static ParseDataHora(dataFormatada: string, horario: string): Date {
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
}

type ALreadyFetch = {
  //dia que fez o fetch
  day_stored: string;
};
