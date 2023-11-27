import { Socket, io } from 'socket.io-client';

export interface CodeBlock {
  code: string;
  roomName: string;
}

class SocketIoService {
  public socket: Socket;

  constructor() {
    this.socket = io('http://localhost:4000');

    this.socket.on('connect', () => {
      console.log('Connected to SocketIO');
    });
    this.socket.on('disconnet', () => {
      console.log('Disconnected from SocketIO');
    });
  }

  connect(){
    this.socket.connect();
  }
}
const socketIoService = new SocketIoService();

export default socketIoService;
