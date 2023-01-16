import axios from "axios";

const API = "http://localhost:8080/consumption/cons";

const findConsumption = (zi, device_id) => {
    return axios.post(API,{ zi: zi, device_id});
  };

  export { findConsumption}