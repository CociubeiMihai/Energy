import axios from "axios";

const findAllDevices = (id) => {
    return axios.get(`http://localhost:8080/person/${id}`);
  };

  const findAllUsers = () => {
    return axios.get(`http://localhost:8080/person/all`);
  };

  const assignUserToDevice = (numeUser, device_id) => {
    return axios.post(`http://localhost:8080/person/deviceAsign`,{ numeUser: numeUser, device_id: device_id });
  };

  const removeUsers = (uuidList) => {
    return axios.post(`http://localhost:8080/person/remove`,{ uuidList: uuidList});
  };

  const editRol = (rol, name) => {
    return axios.patch(`http://localhost:8080/person/rol`,{rol: rol, name: name});
  };

  const findAll = () => {
    return axios.get(`http://localhost:8080/person`);
  };

  const register = (name, password) => {
    return axios.patch(`http://localhost:8080/person/register`, { name: name, password: password });
  };

  const findUser = (id) => {
    return axios.get(`http://localhost:8080/person/findUser/${id}`);
  };

export { findAllDevices, findAllUsers, assignUserToDevice, removeUsers, editRol, findAll, register, findUser };