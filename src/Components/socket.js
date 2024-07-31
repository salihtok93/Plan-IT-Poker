import { io } from "socket.io-client";

const socket = new io("http://192.168.103.14:3000", {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
