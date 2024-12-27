import React from "react";
import { io } from "socket.io-client";
import { Chess } from "chess.js";
const socket = io.connect("http://localhost:3000");

const App = () => {
  socket.emit("hello");
  socket.on("hello there", () => {
    console.log("Hello there received");
  });
  return (
    <div className="w-full h-screen bg-zinc-900 flex items-center justify-center">
      <div className="chessboard w-96 h-96 bg-red-400 "></div>
    </div>
  );
};

export default App;
