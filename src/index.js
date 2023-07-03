import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from "./store";
import App from './App';
import { AppProvider } from "./context/productcontex";
import { FilterContextProvider } from "./context/filter_context";
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from "./context/NotificationContext";

import { io } from "socket.io-client";

// Create a socket instance and connect to the server
const socket = io("");


const persistedStore = persistStore(store);
ReactDOM.render(
  <React.StrictMode>
     <NotificationProvider >
   <BrowserRouter>
   <AuthProvider>
    <Provider store={store}>
     
  <PersistGate loading={<div>Loading...</div>} persistor={persistedStore}>

    <AppProvider>
    <FilterContextProvider>
      
  
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
        

      </FilterContextProvider>
      </AppProvider>

      </PersistGate>
          </Provider>
          </AuthProvider>
          </BrowserRouter>
          </NotificationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);