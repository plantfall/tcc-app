import {Especialista} from '../screens/ScreenAgendarConsulta/useAgendarConsulta';
import firestore from '@react-native-firebase/firestore';
import {formatarFirestoreDateParaDataIso} from '../utils/DateUtils';
import {AppUtils} from '../utils/AppUtils';
import {consultasMock} from '../mocks/Consultas.mock';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Status = 'AGENDADA' | 'CANCELADA' | 'CONCLUIDA' | 'REAJENDADA';
export type Consulta = {
  id?: string;
  especialista: Especialista;
  dataMarcada: string;
  horarioMarcado: string;
  status: Status;
};

export type ConsultaResponse = {
  id: string;
  especialista: Especialista;
  dataMarcada: FirestoreTimestamp;
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
        const data = doc.data() as ConsultaResponse;

        return {
          id: doc.id,
          dataMarcada: formatarFirestoreDateParaDataIso(data.dataMarcada),
          especialista: data.especialista,
          horarioMarcado: data.horarioMarcado,
          status: data.status,
        };
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
        status: 'AGENDADA',
        dataMarcada: consulta.dataMarcada,
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
}

type ALreadyFetch = {
  //dia que fez o fetch
  day_stored: string;
};
