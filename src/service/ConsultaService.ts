import {Especialista} from '../screens/ScreenAgendarConsulta/useAgendarConsulta';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {formatarFirestoreDateParaDataIso} from '../utils/DateUtils';
import {AppUtils} from '../utils/AppUtils';
import {consultaMock, consultasMock} from '../mocks/Consultas.mock';

export type Status = 'AGENDADA' | 'CANCELADA' | 'CONCLUIDA';
export type Consulta = {
  especialista: Especialista;
  dataMarcada: string;
  horarioMarcado: string;
  status: Status;
};

export type ConsultaResponse = {
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
}
