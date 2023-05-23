import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API = axios.create({ baseURL: "https://parkr-yxog6oqeqq-ew.a.run.app" });

export async function getNearbyPlaces(data) {
  const token = await SecureStore.getItemAsync("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await API.post("/parkingLots/nearby", data, { headers });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

export async function getPlaceDetails(data) {
  const token = await SecureStore.getItemAsync("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await API.post("/parkingLots/place-details", data, {
      headers,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

export async function getRecentPlaces() {
  const token = await SecureStore.getItemAsync("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await API.get("/users/recent", { headers });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}
