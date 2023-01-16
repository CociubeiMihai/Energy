import axios from "axios";

const API = "http://localhost:9000/sensors/publish";

const simulate = (uuidList) => {
    return axios.post(API, { uuidList: uuidList });
  };

export { simulate };