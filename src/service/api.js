import axios from "axios";
const api = axios.create({
  baseURL: "https://whispering-headland-58237.herokuapp.com/",
  timeout: 10000
});

export { api };
