import { Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";
import MessageModel from "../3-models/message-model";
import codeBlocks from "../dummyDB";

//this handle socket.io operations
function handleSocketIo(httpServer: HttpServer): void {
  //create the options - any client connect +use (cors)
  const options = { cors: { origin: "*" } };

  //create the socket.io server (its another server)
  const socketIoServer = new SocketIoServer(httpServer, options);
  const roomOccupants = {};

  //1) the server listen to client connections
  socketIoServer.sockets.on("connection",async  (socket: Socket) => {
    console.log("client is connected to socket.io server");
    socket.on("joinedRoom",(data)=>{
      const roomName = data.roomName;
      const code=codeBlocks.find(data.roomName)
      socket.emit("sendCode",code)
      if (!roomOccupants[roomName]) {
        roomOccupants[roomName] = [];
      }const occupants = roomOccupants[roomName];
      let role = "student";
      if (occupants.length === 0) {
        role = "mentor";
      } roomOccupants[roomName].push(socket.id);
      socket.join(roomName);
      socket.emit("role", role);
      console.log(`You are the ${role}`);
      
    })

    socket.on("codeEdited", (data: { roomName: string; code: string }) => {
      
      // 1.save code to db
      const updatedCodeBlocks = codeBlocks.map((block) => {
        if (block.roomName === data.roomName) {
          return { ...block, code: data.code };
        }
        return block;
      });
      //saving in db
      codeBlocks.length = 0; 
      codeBlocks.push(...updatedCodeBlocks)
      //change the room data
      socket.to(data.roomName).emit("codeEdited", {
        roomName: data.roomName,
        code: data.code,
      });

      // await dbService.saveCode(data.roomName)
      // 2.emit to room new code
      socket
        .to(data.roomName)
        .emit("codeEdited", { roomName: data.roomName, code: data.code });
    });

    //(4) listen to client messages:
    // socket.on("msg-client: ", (message: MessageModel) => {
    //   console.log("client send msg: ", message);
    //   //send given message to all (socketS from line 13) of the clients
    // //   socketIoServer.sockets.emit("msg-server: ", message);
    // });

    //(7) server listen to client disconnect
    socket.on("disconnect", () => {
      console.log("Client is disconnected");
    });

    socket.on('leaveRoom', (roomName) => {
      socket.leave(roomName); // Leave the specified room
      console.log(`Socket ${socket.id} left room ${roomName}`);

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