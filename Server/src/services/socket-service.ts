import { Server as HttpServer } from 'http';
import { Server as SocketIoServer, Socket } from 'socket.io';
import dbCodeService from '../dummyDB';

// Function to make a socket leave all rooms except its own default room
function leaveAllRoomsExceptOwn(socket: Socket) {
  socket.rooms.forEach((room) => {
    if (room !== socket.id) {
      socket.leave(room);
    }
  });
}

//this handle socket.io operations
function handleSocketIo(httpServer: HttpServer): void {
  //create the options - any client connect +use (cors)
  const options = { cors: { origin: '*' } };

  //create the socket.io server (its another server)
  const io = new SocketIoServer(httpServer, options);

  //1) the server listen to client connections
  io.on('connection', async (socket: Socket) => {
    console.log('client is connected to socket.io server', socket.id, socket);

    socket.on('joinedRoom', ({ roomName }) => {
      const code = dbCodeService.find(roomName);
      socket.emit('sendCode', code);

      // After joining the room, fetch and log all clients in that room
      const roomOccupants = io.sockets.adapter.rooms.get(roomName);
      if (roomOccupants) {
        console.log(`Clients in room ${roomName}:`, roomOccupants);
      }

      let role = [...roomOccupants].length === 0 ? 'mentor' : 'student';

      socket.join(roomName);
      leaveAllRoomsExceptOwn(socket);

      socket.emit('role', role);
      console.log(`role of ${socket.id} is: ${role}`);
    });

    // client -> socket.emit('codeEdited', { roomName, code })
    socket.on('codeEdited', (data: { roomName: string; code: string }) => {
      // 1.save code to db
      const updatedCodeBlock = dbCodeService.find(
        (codeBlock) => codeBlock.roomName === data.roomName
      );
      updatedCodeBlock.code = data.code;

      //change the room data
      socket
        // .to(data.roomName)
        .emit('codeEdited', {
          roomName: data.roomName,
          code: updatedCodeBlock.code,
        });
    });

    socket.on('disconnect', () => {
      console.log('Client is disconnected');
    });
  });
}

export default {
  handleSocketIo,
};
