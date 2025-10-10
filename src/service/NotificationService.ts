import {NativeModules} from 'react-native';
import PushNotification from 'react-native-push-notification';

const {NotificationModule} = NativeModules;

export class NotificationService {
  public showNotification(title: string, message: string) {
    PushNotification.localNotification({
      channelId: 'consultas-channel',
      title,
      message,
      playSound: true,
      soundName: 'default',
      vibrate: true,
    });

    console.log('notificou');
  }

  /**
   *
   * @param title
   * @param message
   * @param date deve estar no formato: yyyy-MM-dd HH:mm → exemplo: '2025-10-08 14:50'.

   */
  public static async ScheduleNotification(
    title: string,
    message: string,
    uidUser: string,
    date: string,
  ) {
    const id = await NotificationModule.scheduleNotification(
      date,
      title,
      message,
      uidUser,
    );
    return id;
  }

  public static async CancelarNotificaoAgendada(id: string) {
    await NotificationModule.cancelNotification(id);
    await NotificationModule.removeNotificationFromFile(id);
  }

  public static async ListarNotificacoes(
    userId: String,
  ): Promise<Notificacao[]> {
    const list = await NotificationModule.readNotificationsFromFile(userId);

    console.log(list);

    const notificacoes: Notificacao[] = JSON.parse(list);

    return notificacoes;
  }

  public static async LimparNotificacao(id: string): Promise<void> {
    await NotificationModule.removeNotificationFromFile(id);
  }
}

export type Notificacao = {
  id: string;
  titulo: string;
  mensagem: string;
};
