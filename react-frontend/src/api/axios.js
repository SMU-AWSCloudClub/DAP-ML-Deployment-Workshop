import axios from "axios";

const instance = axios.create({
  baseURL: "https://2sbwg7kooc.execute-api.ap-southeast-1.amazonaws.com",
  timeout: 10000,
});

export default instance;