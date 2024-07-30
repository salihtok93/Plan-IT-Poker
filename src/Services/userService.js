import axios from "axios";
const BASE = "http://192.168.103.14:3000";
const USERS = "/users";
export const updateUser = ({ userId, newRole }) => {
  return axios.post(`${BASE}${USERS}/update-role`, {
    userId: userId,
    newRole: newRole,
  });
};
