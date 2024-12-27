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
let currentPlayer = "w";

app.get("/", (req, res) => {
  res.status(200).send("Good");
});

io.on("connection", (socket) => {
  console.log("Connected", socket.id);

  if (!players.white) {
    players.white = socket.id;
    socket.emit("playerRole", "w");
  } else if (!players.black) {
    players.black = socket.id;
    socket.emit("playerRole", "b");
  } else {
    socket.emit("spectator");
  }

  socket.on("disconnect", () => {
    if (socket.id === players.white || socket.id === players.black) {
      //stop the game
    }
  });

  socket.on("move", (move) => {
    try {
      if (chess.turn == "w" && socket.id != players.white) return;
      if (chess.turn == "b" && socket.id != players.black) return;

      const result = chess.move(move);
      if (result) {
        currentPlayer = chess.turn();
        io.emit("move", move);
        io.emit("boardState", chess.fen());
      } else {
        console.log("Invalid Move: ", move);
        socket.emit("invalidMove", move);
      }
    } catch (err) {
      console.log("Invalid Move: ", move);
      console.log(err);
      socket.emit("Invalid Move: ", move);
    }
  });
});

server.listen(3000, () => {
  console.log("Listening at 3000");
});
