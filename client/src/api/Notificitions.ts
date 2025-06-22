import type { Notification } from "../Components/NotificationSettings";

export const getAllNotificationsByUserId = async (userId: string): Promise<Notification[]> => {
  const response = await fetch(`http://localhost:3000/notifications?user_id=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json(); 
};

export const subscribeToNotification = async (userId: string, notificationId: number) => {
    try {
        fetch("http://localhost:3000/notifications/user-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: userId, notificationId: notificationId })
      })
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
    }
};

export const unsubscribeToNotification = async (userId: string, notificationId: number) => {
    try {
        fetch(`http://localhost:3000/notifications/user-notification?user_id=${userId}&notification_id=${notificationId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      })
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
    }
};