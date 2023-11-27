import 'dotenv/config';

import express from 'express';
import socketService from './services/socket.service';
import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});
const PORT = process.env.PORT || 4000;
const app = express();

//give me natvie http server 4 socket
const httpServer = app.listen(PORT, () => {
  console.log('listening on port http://localhost:' + PORT);
});

//send native http server to soket service
socketService.handleSocketIo(httpServer);
