import { useEffect, useState, type FC } from 'react';
import { getAllNotificationsByUserId, subscribeToNotification, unsubscribeToNotification } from '../api/Notificitions';
import styled from 'styled-components';

export type Notification = {
  id: number;
  description: string;
  hasNotification: boolean;
};

const Popup = styled('div')({
  position: "absolute",
  left: "1rem",
  top: "3.5rem",
  background: "white",
  color: "black",
  width: "16rem",
  borderRadius: "0.5rem",
  boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  padding: "0.5rem",
  zIndex: 10,
});

const SettingList = styled('ul')({
  listStyle: "none",
  padding: 0,
  margin: 0,
  maxHeight: "16rem",
  overflowY: "auto",
});

const getUser = () => {const { user } = JSON.parse(localStorage.getItem('userData')!); return user};

export const NotificationSettings: FC = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [user, setUser] = useState<string>(getUser() || '');

  useEffect(() => {
    const getNotifications = async () => setNotifications(await getAllNotificationsByUserId(getUser() || ''));

    setUser(getUser() || '');
    getNotifications();
  }, [isOpen]);

  const handleToggle = async (id: number, hasNotification: boolean) => {
    setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === id ? { ...notif, hasNotification: !notif.hasNotification } : notif
          )
      ); 

     if (!hasNotification) {
        subscribeToNotification(user!, id);
     } else {
        unsubscribeToNotification(user!, id);
     }
  };

  return (
   <>
      <img src="settings.png" width={30} onClick={() => setIsOpen((prev) => !prev)} style={{cursor: 'pointer'}}></img>

      {isOpen && <Popup>
        <h2>הגדרות</h2>
        <SettingList
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            maxHeight: "16rem",
            overflowY: "auto",
          }}
        >
          {notifications.map((notification) => (
            <li
              key={notification.id}
            >
              <span>{notification.description}</span>
              <input
                type="checkbox"
                checked={notification.hasNotification}
                onChange={() => handleToggle(notification.id, notification.hasNotification)}
              />
            </li>
          ))}
        </SettingList>
      </Popup>}
    </>
  );
};

