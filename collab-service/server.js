import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import socketHandler from "./sockets/socket-handler.js";
import { setupYjsHandler } from "./yjs/yjs-handler.js";
import createRoomRoutes from "./routes/room-routes.js";

const port = process.env.PORT || 3219;

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
  path: "/socket.io",
  allowUpgrades: true,
});

setupYjsHandler(server);

app.use("/rooms", createRoomRoutes(io));

socketHandler(io);

server.listen(port, () => {
  console.log("Server running on port " + port);
});
