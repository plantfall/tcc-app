import {Especialista} from '../screens/ScreenAgendarConsulta/useAgendarConsulta';
import firestore from '@react-native-firebase/firestore';

export type Status = 'AGENDADA' | 'CANCELADA' | 'CONCLUIDA';
export type Consulta = {
  especialista: Especialista;
  dataMarcada: string;
  horarioMarcado: string;
  status: Status;
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
}
