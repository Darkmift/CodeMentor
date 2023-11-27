import { Socket, io } from "socket.io-client";
import MessageModel from "../Models/MessageModel";

interface CodeBlock {
  code: string;
  roomName: string;
}

class SocketService {
  public socket: Socket;
  private currentRoom: string;
  private currentCode: string;
  //this send the edited code to the socket server. when someone is typing = this happen
  public onCodeEdited(code: string, roomName: string): void {
    this.socket.emit("codeEdited", { code, roomName });
  }

  public connect(gotMessage: Function): void {
    //(2) built function for the connecting to socket.io
    this.socket = io("http://localhost:4000");

    //(6) listen to server messages
    this.socket.on("msg-server: ", (message: MessageModel) => {
      gotMessage(message);
      console.log(message);
    });

    this.socket.on("codeEdited", (data: CodeBlock) => {
      // update code state
    });
  }

  public send(message: MessageModel): void {
    //(3) client send message to server
    this.socket?.emit("msg-client: ", message);
  }

  public disconnect(): void {
    //(8)client disconnect from server
    this.socket.disconnect();
  }
}
const socketService = new SocketService();

export default socketService;
