import { Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";
import MessageModel from "../3-models/message-model";
import dummyDB from "../DummyDB";

//this handle socket.io operations
function handleSocketIo(httpServer: HttpServer): void {
  //create the options - any client connect +use (cors)
  const options = { cors: { origin: "*" } };

  //create the socket.io server (its another server)
  const socketIoServer = new SocketIoServer(httpServer, options);

  //1) the server listen to client connections
  socketIoServer.sockets.on("connection",async  (socket: Socket) => {
    console.log("client is connected to socket.io server");
    socket.on("joinedRoom",(data)=>{
      const code=dummyDB.getCode(data.roomName);//await dbService.getCode(data.roomName)
      socket.emit("sendCode",code)
    })

    socket.on("codeEdited", (data: { roomName: string; code: string }) => {
      // 1.save code to db
      // await dbService.saveCode(data.roomName)
      // 2.emit to room new code
      socket
        .to(data.roomName)
        .emit("codeEdited", { roomName: data.roomName, code: data.code });
    });

    //(4) listen to client messages:
    socket.on("msg-client: ", (message: MessageModel) => {
      console.log("client send msg: ", message);
      //send given message to all (socketS from line 13) of the clients
      socketIoServer.sockets.emit("msg-server: ", message);
    });

    //(7) server listen to client disconnect
    socket.on("disconnect", () => {
      console.log("Client is disconnected");
    });
  });
}
//
// io.on('connection', (socket) => {
//   socket.on('joinRoom', (data) => {
//     const { roomName, customAttribute } = data;
//     socket.join(roomName);
//     socket.customAttribute = customAttribute;
//     const clientsInRoom = io.sockets.adapter.rooms.get(roomName);
//     if (clientsInRoom) {
//       const clientsArray = [...clientsInRoom];
//       console.log('Clients in room:', clientsArray);
//       io.to(socket.id).emit('joinedRoom', {
//         roomName,
//         customAttribute: socket.customAttribute,
//       });
//     }
//   });
export default {
  handleSocketIo,
};


/**
 * Collection:[{roomname,code}]
 * collection.find({roomname})
 */