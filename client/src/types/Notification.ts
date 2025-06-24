export interface Notification {
  message: string;
  date: string;
  hasNotification?: boolean;
}

export interface NotificationData {
  id: number;
  description: string;
  hasNotification: boolean;
}
