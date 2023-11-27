import express from 'express';
import socketService from './services/socket-service';
import config from './config';

const app = express();

//give me natvie http server 4 socket
const httpServer = app.listen(config.PORT, () =>
  console.log('listening on port http://localhost:' + config.PORT)
);

//send native http server to soket service
socketService.handleSocketIo(httpServer);
