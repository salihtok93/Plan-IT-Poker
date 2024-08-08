import axios from "axios";
// const BASE = "http://192.168.103.14:3000";
const BASE = process.env.REACT_APP_BASE;
const USERS = "/users";

console.log(process.env.REACT_APP_BASE);
export const registerUser = ({ name, email }) => {
  return axios.post(`${BASE}${USERS}/new-user`, {
    name: name,
    email: email,
  });
};

export const updateUser = ({ userId, newRole }) => {
  return axios.post(`${BASE}${USERS}/update-role`, {
    userId: userId,
    newRole: newRole,
  });
};

export const updateStatus = ({ userId }) => {
  return axios.post(`${BASE}${USERS}/update-status`, {
    userId: userId,
  });
};

export const fetchUser = () => {
  console.log("Fetch User userService.js");
  return axios.get(`${BASE}${USERS}`);
};

export const deleteUser = (userId) => {
  return axios.delete(`${BASE}${USERS}/${userId}`, { userId: userId });
};
