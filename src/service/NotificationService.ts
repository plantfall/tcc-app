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
  public static ScheduleNotification(
    title: string,
    message: string,
    date: string,
  ) {
    NotificationModule.scheduleNotification(
      date,
      'Reunião',
      'Lembrete: reunião!',
    );
  }
}
