import {Especialista} from '../screens/ScreenAgendarConsulta/useAgendarConsulta';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {formatarFirestoreDateParaDataIso} from '../utils/DateUtils';
import {AppUtils} from '../utils/AppUtils';
import {consultaMock, consultasMock} from '../mocks/Consultas.mock';

export type Status = 'AGENDADA' | 'CANCELADA' | 'CONCLUIDA';
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

      await firestore()
        .collection('users')
        .doc(uidUser)
        .collection('consultas')
        .add(consultaRequest);

      console.log('agendou');
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async fetchConsultas(uidUser: string): Promise<Consulta[]> {
    try {
      if (AppUtils.TestMode) {
        const consultas: Consulta[] = consultasMock.map(data => {
          return {
            id: data.id,
            dataMarcada: formatarFirestoreDateParaDataIso(data.dataMarcada),
            especialista: data.especialista,
            horarioMarcado: data.horarioMarcado,
            status: data.status,
          };
        });
        return consultas;
      }

      const snapshot = await firestore()
        .collection('users')
        .doc(uidUser)
        .collection('consultas')
        .get();

      const consultas: Consulta[] = snapshot.docs.map(doc => {
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
      const consultaRef = firestore()
        .collection('users')
        .doc(uidUser)
        .collection('consultas')
        .doc(consultaId);

      await consultaRef.update({status: 'CANCELADA'});

      console.log(`Consulta ${consultaId} cancelada com sucesso`);
      return true;
    } catch (error: any) {
      console.error('Erro ao cancelar consulta:', error.message);
      return false;
    }
  }
}
