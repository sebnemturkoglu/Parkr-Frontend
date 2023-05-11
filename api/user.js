import axios from "axios";
const API = axios.create({ baseURL: "https://parkr-yxog6oqeqq-ew.a.run.app" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("token"))
      }`;
    }
    return req;
  });

// export const fetchUsers = () => API.get("/admin/users");
export const getCurrentParking = () => API.get("");