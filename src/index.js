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
const persistedStore = persistStore(store);
ReactDOM.render(
  <React.StrictMode>
   <BrowserRouter>
    <Provider store={store}>
     
  <PersistGate loading={<div>Loading...</div>} persistor={persistedStore}>

    <AppProvider>
    <FilterContextProvider>
      <AuthProvider>
  
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
        
      </AuthProvider>
      </FilterContextProvider>
      </AppProvider>

      </PersistGate>
          </Provider>
          </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);