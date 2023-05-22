import { configureStore } from "@reduxjs/toolkit";
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from "react-redux";
import AuthContextProvider from './AuthContext';
import AppContainer from './navigation/AppContainer';
import placesReducer from "./reducers/places";
import searchPlaces from './reducers/searchPlaces';
import placeDetails from "./reducers/placeDetails";
import currentParkingData from "./reducers/currentParkingData";
import pastParkingData from "./reducers/pastParkingData";
import vehicles from "./reducers/vehicles";

const store = configureStore({
  reducer: {
    searchPlaces, searchPlaces,
    places: placesReducer,
    placeDetails: placeDetails,
    pastParkingData: pastParkingData,
    currentParkingData: currentParkingData,
    vehicles: vehicles,
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
