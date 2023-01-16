import axios from "axios";

const API = "http://localhost:8080/login";

const authorize = (name, password) => {
    return axios.post(API, { name: name, password: password });
  };

export { authorize };