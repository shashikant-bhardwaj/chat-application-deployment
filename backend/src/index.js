import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { initializeSocket } from "./socket/socket.js";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";


dotenv.config({
  path: "./.env",
});

const server = http.createServer(app);
const io = initializeSocket(server);


connectDB()
  .then(() => {
    server.on("error", (error) => {
      console.log(`HTTP SERVER EVENT ERROR: ${error}`);
      throw error;
    });

    server.listen(process.env.PORT || 5000, () => {
      console.log(`server is running at port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.log(`mongoDB connection failed!! ${error}`);
  });
