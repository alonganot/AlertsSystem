import { Injectable } from "@nestjs/common";
import { executeQuery } from "src/db/dbConnection";
import { NotificationWithUserFlag, UserNotification } from "./types";
// import { KafkaProducer } from "src/kafka/kafka.producer";

@Injectable()
export class NotificationsService {
  constructor() {}
  
  async getAllNotifications(userId: string) {
    return executeQuery<NotificationWithUserFlag[]>(`
      SELECT 
        notification.id, 
        notification.description,
        (un.notification_id IS NOT NULL) AS "hasNotification"
      FROM user_preference.notifications notification
      LEFT JOIN user_preference.user_notifications un 
        ON notification.id = un.notification_id AND un.user_id = $1
      ORDER BY notification.id
    `, [userId]);
  }

  async addUserNotification(
    userId: string,
    notificationTypeId: number,
  ): Promise<UserNotification[]> {
    await executeQuery(
      'INSERT INTO user_preference.user_notifications_new(user_id, notification_id) VALUES ($1, $2)',
      [userId, notificationTypeId],
    );

    // return all user_notifications for this user, optional
    return executeQuery<UserNotification>(
      'SELECT user_id, notification_id FROM user_preference.user_notifications WHERE user_id = $1',
      [userId],
    );
  }

  async removeUserNotification(
    userId: string,
    notificationTypeId: number,
  ): Promise<UserNotification[]> {
    await executeQuery(
      'DELETE FROM user_preference.user_notifications_new WHERE user_id = $1 AND notification_id = $2',
      [userId, notificationTypeId],
    );

    // return all user_notifications for this user, optional
    return executeQuery<UserNotification>(
      'SELECT user_id, notification_id FROM user_preference.user_notifications WHERE user_id = $1',
      [userId],
    );
  }
}
