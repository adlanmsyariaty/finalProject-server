if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT || 3000;
const cors = require("cors");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const router = require("./routes");
const http = require('http')
const server = http.createServer(app)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

const { Server } = require("socket.io")
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET"]
  },
})

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on("send_message", function (data) {
    socket.broadcast.emit("receive_message", data)
  })
})

app.use(errorHandler);

server.listen(port, (_) => {
  console.log(`This app is listening on port `, port)
});

// module.exports = app