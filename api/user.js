import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const API = axios.create({ baseURL: "https://parkr-yxog6oqeqq-ew.a.run.app"});


export async function getPastParking() {
  const token = await SecureStore.getItemAsync('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await API.get("/users/past-parking", {headers});
    return response.data;

  } catch (error) {
    console.log(error.response.data);
  }
}

export async function getCurrentParking() {
  const token = await SecureStore.getItemAsync('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await API.get("/users/current-parking", {headers});
    return response.data;

  } catch (error) {
    console.log(error.response.data);
  }
}