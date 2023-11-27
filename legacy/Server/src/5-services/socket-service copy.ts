import { Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";
import codeBlocks from "../dummyDB";

function handleSocketIo(httpServer: HttpServer): void {
  const options = { cors: { origin: "*" } };
  const socketIoServer = new SocketIoServer(httpServer, options);

  socketIoServer.sockets.on("connection", async (socket: Socket) => {
    console.log("Client is connected to socket.io server");

    const roomName = "YourRoomName"; // Define your room name

    socket.join(roomName);

    const clientsInRoom = socketIoServer.sockets.adapter.rooms.get(roomName);
    const isEditor = clientsInRoom ? clientsInRoom.size === 1 : true; // Set isEditor based on room occupancy

    const role = isEditor ? "mentor" : "student";
    socket.emit("role", role); // Emit role information to the client
    console.log(`check role status: ${role}`);

    socket.on("joinedRoom", () => {
      const code = codeBlocks.find((block) => block.roomName === roomName);
      socket.emit("sendCode", code);
    });

    socket.on("codeEdited", (data: { roomName: string; code: string }) => {
      // Save code to the database
      // Emit updated code to the room
      socket.to(data.roomName).emit("codeEdited", {
        roomName: data.roomName,
        code: data.code,
      });
    });

    socket.on("disconnect", () => {
      console.log("Client is disconnected");
    });

    socket.on("leaveRoom", () => {
      socket.leave(roomName);
      console.log(`Socket ${socket.id} left room ${roomName}`);
    });
  });
}

export default {
  handleSocketIo,
};
