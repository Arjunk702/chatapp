import { Server } from "socket.io";
import http from "http";
import express from "express";
import { isOriginAllowed } from "./config.js";

const app = express();
const server = http.createServer(app);

const userSocketMap = new Map(); // userId -> socketId

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("setup", (userId) => {
    if (!userId) return;
    socket.data.userId = userId.toString();
    userSocketMap.set(socket.data.userId, socket.id);
    socket.join(socket.data.userId);
    io.emit("onlineUsers", Array.from(userSocketMap.keys()));
  });

  socket.on("typing", ({ to, from }) => {
    if (!to || !from) return;
    socket.to(to.toString()).emit("typing", { from: from.toString() });
  });

  socket.on("stopTyping", ({ to, from }) => {
    if (!to || !from) return;
    socket.to(to.toString()).emit("stopTyping", { from: from.toString() });
  });

  socket.on("disconnect", () => {
    const userId = socket.data.userId;
    if (userId && userSocketMap.get(userId) === socket.id) {
      userSocketMap.delete(userId);
      io.emit("onlineUsers", Array.from(userSocketMap.keys()));
    }
    console.log("A user disconnected", socket.id);
  });
});

export { io, app, server };
