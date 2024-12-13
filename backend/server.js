const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const cors = require("cors");
const reactHost = "http://localhost:3001";

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: reactHost,
    methods: ["GET", "POST"],
  },
});

const chess = new Chess();

let players = {};
let currentPlayer = "W";

app.get("/", (req, res) => {
  res.status(200).send("Good");
});

io.on("connection", (socket) => {
  console.log("Connected", socket.id);

  socket.on("hello", () => {
    console.log("Hello received", socket.id);
    io.emit("hello there");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Listening at 3000");
});
