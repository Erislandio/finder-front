import axios from "axios";
const api = axios.create({
  baseURL: "https://whispering-headland-58237.herokuapp.com/",
});

export { api };
