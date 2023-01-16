import axios from "axios";

const API = "http://localhost:8080/device";

const unUnsignedDevices = () => {
    return axios.get(API);
  };

  const findAllDevices = () => {
    return axios.get(`http://localhost:8080/device/all`);
  };

  const removeDevices = (uuidList) => {
    return axios.post(`http://localhost:8080/device/removeDiv`,{ uuidList: uuidList});
  };

  const updateDevice = (id,description,address,maxHourlyConsumption, assigned) => {
    return axios.post(`http://localhost:8080/device`,{ id_user: id, 
                                                      description: description, 
                                                      address: address,
                                                      maxHourlyConsumption: maxHourlyConsumption,
                                                      assigned: assigned
                                                    });
  };

  const createDevice = (description,address,maxHourlyConsumption) => {
    return axios.post(`http://localhost:8080/device/create`,{ description: description, 
                                                              address: address,
                                                              maxHourlyConsumption: maxHourlyConsumption
                                                            });
  };

export { unUnsignedDevices, findAllDevices, removeDevices, updateDevice, createDevice };