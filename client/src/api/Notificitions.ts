import { appConfig } from "../appConfig";
import type { Notification } from "../Components/NotificationSettings";

export const getAllNotificationsByUserId = async (userId: string): Promise<Notification[]> => {
  const response = await fetch(`${appConfig.SERVER_URL}/notifications?user_id=${userId}`, { method: "GET" });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json(); 
}

export const subscribeToNotification = async (userId: string, notificationId: number): Promise<Notification[]> => {
  const response = await fetch(`${appConfig.SERVER_URL}/notifications/user-notification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId: userId, notificationId: notificationId })
  });

  return response.json();
}

export const unsubscribeToNotification = async (userId: string, notificationId: number): Promise<Notification[]> => {
  const response = await fetch(`${appConfig.SERVER_URL}/notifications/user-notification?user_id=${userId}&notification_id=${notificationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    }); 

  return response.json();
}
