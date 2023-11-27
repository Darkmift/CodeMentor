import { Server as HttpServer } from 'http';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { getCodeBlocks, updateCodeBlock } from './codeblock.service';

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
  io.on('connection', (socket: Socket) => {
    console.log('client is connected to socket.io server', { id: socket.id });

    socket.on('joinedRoom', async ({ roomName }) => {
      const codeBlockDocument = await getCodeBlocks(roomName);
      if (!codeBlockDocument?.code) {
        throw new Error('code block not found');
      }
      // const { code } = dbCodeService.find((codeBlock) => codeBlock.roomName === roomName);
      const { code } = codeBlockDocument;
      socket.emit('sendCode', { code: code });
      console.log({ roomName });

      leaveAllRoomsExceptOwn(socket);
      socket.join(roomName);

      // After joining the room, fetch and log all clients in that room
      const roomOccupants = io.sockets.adapter.rooms.get(roomName);

      console.log(`Clients in room ${roomName}:`, roomOccupants);
      const role: 'mentor' | 'student' = [...roomOccupants].length === 1 ? 'mentor' : 'student';

      socket.emit('role', { role });
      socket.emit('codeEdited', { code, roomName });
      console.log(`role of ${socket.id} is: ${role}`);
    });

    // client -> socket.emit('codeEdited', { roomName, code })
    socket.on('emitCodeChange', (data: { roomName: string; code: string }) => {
      console.log('🚀 ~ file: socket-service.ts:64 ~ socket.on ~ code:', data.code);
      // 1.save code to db
      updateCodeBlock(data.code, data.roomName)
      socket.to(data.roomName).emit('codeEdited', { roomName: data.roomName, code: data.code });
    });

    socket.on('disconnect', () => {
      console.log('Client is disconnected');
    });
  });
}

export default {
  handleSocketIo,
};
