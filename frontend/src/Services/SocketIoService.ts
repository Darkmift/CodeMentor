import { Socket, io } from 'socket.io-client';

interface CodeBlock {
  code: string;
  roomName: string;
}

class SocketIoService {
  public socket: Socket;
  private currentRoom: string;
  private currentCode: string;
  //this send the edited code to the socket server. when someone is typing = this happen
  public onCodeEdited(code: string, roomName: string): void {
    this.socket.emit('codeEdited', { code, roomName });
  }

  public connect(): void {
    //(2) built function for the connecting to socket.io
    this.socket = io('http://localhost:4000');

    this.socket.on('connect', () => {
      console.log('Connected to SocketIO');
    });

    this.socket.on('role', (data) => {
      console.log(`You are the ${data.role}`);
    });

    this.socket.on('codeEdited', (data: CodeBlock) => {
      // update code state
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Disconnected from SocketIO');
    }
  }
}
const socketIoService = new SocketIoService();

export default socketIoService;
