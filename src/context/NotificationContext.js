import React, { createContext, useEffect, useState, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children, socket }) => {
  const [notification, setNotification] = useState(null);
  const [seller, setSeller] = useState([]);

  //const uri = "https://backend.render.com"


  // Function to clear the notification
  const clearNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{  notification, seller, setSeller, clearNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

  
export default NotificationContext;
