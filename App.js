import { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppContainer from './navigation/AppContainer';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import AuthContextProvider from './AuthContext';
import { AuthContext } from './AuthContext';
import placesReducer from "./reducers/places";
import { useContext } from 'react';


const store = configureStore({
  reducer: {
    places: placesReducer
  },
});

export default function App() {

  return (
    <Provider store={store}>
    <PaperProvider>
      <AuthContextProvider>
        <AppContainer />
      </AuthContextProvider>
    </PaperProvider>
    </Provider>
  );
}
