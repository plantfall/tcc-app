import BackgroundService from 'react-native-background-actions';
import {ConsultaService} from './ConsultaService';

const sleep = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

// Sua tarefa em background
const backgroundTask = async (taskData: any) => {
  const consultaService = new ConsultaService();

  await new Promise(async resolve => {
    // Loop infinito para verificar consultas periodicamente
    while (BackgroundService.isRunning()) {
      console.log('Verificando consultas em background...');

      // Verifica se há consultas para notificar
      consultaService.notificarProximaConsultaMock();

      // Aguarda 1 minuto antes da próxima verificação
      // Para teste, você pode reduzir para 20 segundos
      await sleep(20000); // 20 segundos para teste
    }
  });
};

// Opções do serviço em background
const options = {
  taskName: 'ConsultaNotifier',
  taskTitle: 'Verificando consultas',
  taskDesc: 'Verificando consultas agendadas',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
    package: 'com.app.tcc',
  },
  //color: '#ff00ff',
  parameters: {
    delay: 1000,
  },
  //   linkingURI: 'yourScheme://chat/jane',
};

class BackgroundNotificationService {
  public static async startBackgroundService() {
    try {
      await BackgroundService.start(backgroundTask, options);
      console.log('Serviço de background iniciado');
    } catch (error) {
      console.log('Erro ao iniciar serviço de background:', error);
    }
  }

  public static async stopBackgroundService() {
    await BackgroundService.stop();
    console.log('Serviço de background parado');
  }
}

export default BackgroundNotificationService;
