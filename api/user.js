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

export async function getVehicles() {
  const token = await SecureStore.getItemAsync('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await API.get("/users/cars", {headers});
    return response.data;

  } catch (error) {
    console.log(error.response.data);
  }
}

export async function addVehicle(data) {
  const token = await SecureStore.getItemAsync('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await API.post("/users/add-vehicle", data, {headers});
    return response.data;

  } catch (error) {
    console.log(error.response.data);
  }
}

export async function deleteVehicle(id) {
  const token = await SecureStore.getItemAsync('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await API.delete(`/users/cars/${id}`, {headers});
    return response.data;

  } catch (error) {
    console.log(error.response.data);
  }
}
