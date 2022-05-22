const express = require("express");
const cors = require("cors")
const { connection } = require("./config/connection");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 3001;
const http = require('http')
const server = http.createServer(app)

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/consultation", router);

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

connection().then(async () => {
  server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});