import { io, Socket } from 'socket.io-client';

const URL = 'http://localhost:5000'; // Your backend URL

const socket: Socket = io(URL, {
  transports: ['websocket'],
  autoConnect: true
});

export default socket;
