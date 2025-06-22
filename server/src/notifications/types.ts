export interface Notification {
  id: number;
  description: string;
}

export interface UserNotification {
  user_id: number;
  notification_id: number;
}
