import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const API = axios.create({ baseURL: "https://parkr-yxog6oqeqq-ew.a.run.app"});

const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    console.log("api has the token", token);
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    console.log(error);
  }
};

getToken();

export async function getNearbyPlaces(data) {
  const token = await SecureStore.getItemAsync('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await API.post("/parkingLots/nearby", data, {headers});
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.log(error.response.data);
  }
}


// export const getNearbyPlaces = (data) => API.post("/parkingLots/nearby", data);
export const getRecentPlaces = (data) => API.post("/parkingLots/recent", data);