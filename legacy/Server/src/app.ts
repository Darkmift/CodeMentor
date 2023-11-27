import appConfig from "./2-utils/app-config";
import express from "express";
import socketService from "./5-services/socket-service";

const expressServer = express();
//give me natvie http server 4 socket
const httpServer = expressServer.listen(appConfig.port, () =>
  console.log(" U listening on port http://localhost:" + appConfig.port)
);

//send native http server to soket service
socketService.handleSocketIo(httpServer);
