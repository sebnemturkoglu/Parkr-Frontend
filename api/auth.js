import axios from "axios";
const API = axios.create({ baseURL: "https://parkr-yxog6oqeqq-ew.a.run.app", headers: {
    'Content-Type': 'application/json',
  }, });

export const signUp = (data) => API.post("/users/sign-up", data);
export const signIn = (data) => API.post("/users/sign-in", data);
export const logout = (data) => API.post("/users/signout", data);