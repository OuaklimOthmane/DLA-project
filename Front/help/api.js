import axios from "axios";
const axiosAPI = axios.create({
  baseURL: "http://localhost:8082/api",
  // baseURL: "https://backend.buildinmorocco.com/api",
});

let token =
  typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;

axiosAPI.defaults.headers.common["Authorization"] = token;
export const initTokenAxios = () => {
  //   const token = browser && (localStorage.getItem("security") || null);
  let token =
    typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  axiosAPI.defaults.headers.common["Authorization"] = token;
};

export default axiosAPI;
