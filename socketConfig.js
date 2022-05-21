const { Server } = require("socket.io")
const express = require("express");
const app = express();
const http = require('http')
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET"]
  },
})

io.on('connection', socket => {
  console.log(`User connected: ${socket.id}`)

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

});

module.exports = io;