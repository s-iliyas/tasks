import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_BACKEND_BASE_URL;

const socket = io(URL);

socket.auth = {
  token: localStorage.getItem("chatToken"),
  room: localStorage.getItem("currentRoom"),
};

export default socket;
