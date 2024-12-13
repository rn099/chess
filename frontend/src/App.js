import React from "react";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3000");

const App = () => {
  socket.emit("hello");
  socket.on("hello there", () => {
    console.log("Hello there received");
  });
  return (
    <div>
      <h1>Chess</h1>
    </div>
  );
};

export default App;
