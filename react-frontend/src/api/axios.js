import axios from "axios";

const instance = axios.create({
  baseURL: "https://grmwhg8uwi.execute-api.ap-southeast-1.amazonaws.com/default",
  timeout: 1000,
});

export default instance;