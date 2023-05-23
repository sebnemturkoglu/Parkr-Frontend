import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API = axios.create({ baseURL: "https://parkr-yxog6oqeqq-ew.a.run.app" });

export async function getRoutes(data) {
  const token = await SecureStore.getItemAsync("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await API.post("/parkingLots/route-details", data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}
