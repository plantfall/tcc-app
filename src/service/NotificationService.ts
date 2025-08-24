import PushNotification from 'react-native-push-notification';

class NotificationService {
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

  public scheduleNotification(title: string, message: string, date: Date) {
    PushNotification.localNotificationSchedule({
      channelId: 'consultas-channel',
      title,
      message,
      date, // deve ser uma data futura
      allowWhileIdle: true,
      playSound: true,
      soundName: 'default',
      vibrate: true,
    });
    console.log('Notificação agendada para:', date.toLocaleString());
  }
}

export default new NotificationService();
