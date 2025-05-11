// socket.js
import { io } from "socket.io-client";

let socket;

export const initSocket = ({ userId, userModel }) => {
  socket = io("http://localhost:9000", {
    query: { userId, userModel },
  });

  return socket;
};

export const getSocket = () => socket;
