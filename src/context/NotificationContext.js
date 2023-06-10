import React, { createContext, useEffect, useState, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children, socket }) => {
  const [notification, setNotification] = useState(null);
  const [seller, setSeller] = useState([]);
  console.log("provideSockey", socket)
  useEffect(() => {
    // Listen for notification events
    socket.on("notification", (message) => {
      setNotification(message);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.off("notification");
    };
  }, [socket]);

  useEffect(() => {
    console.log("Notification:", notification);
  }, [notification]);

  // Function to clear the notification
  const clearNotification = () => {
    setNotification(null);
  };

const bob = "Tim"
console.log("ProviderSeller", seller)
  return (
    <NotificationContext.Provider value={{ bob, notification, seller, setSeller, clearNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

  
export default NotificationContext;
