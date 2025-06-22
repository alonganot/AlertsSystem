import { Injectable } from "@nestjs/common";
import { executeQuery } from "src/db/dbConnection";
import { KafkaProducer } from "src/kafka/kafka.producer";
import { Notification, UserNotification } from "./types";

@Injectable()
export class NotificationsService {
  constructor() {}
 // constructor(private readonly kafkaService: KafkaProducer) {}

  subscribeEvent() {
    return '';
    //return this.kafkaService.send("gf", {});
  }

  async getAllNotifications(): Promise<Notification[]> {
    executeQuery<Notification>('BEGIN');
    const response = executeQuery<Notification>('SELECT id, description FROM user_preference.notifications')
    executeQuery<Notification>('COMMIT');
    return response
  }

  async addUserNotification(
    user_id: number,
    notification_id: number,
  ): Promise<UserNotification[]> {
    await executeQuery(
      'INSERT INTO user_notifications (user_id, notification_id) VALUES ($1, $2)',
      [user_id, notification_id],
    );

    // return all user_notifications for this user, optional
    return executeQuery<UserNotification>(
      'SELECT user_id, notification_id FROM user_notifications WHERE user_id = $1',
      [user_id],
    );
  }

  async removeUserNotification(
    user_id: number,
    notification_id: number,
  ): Promise<UserNotification[]> {
    await executeQuery(
      'DELETE FROM user_notifications WHERE user_id = $1 AND notification_id = $2',
      [user_id, notification_id],
    );

    // return all user_notifications for this user, optional
    return executeQuery<UserNotification>(
      'SELECT user_id, notification_id FROM user_notifications WHERE user_id = $1',
      [user_id],
    );
  }
}
