const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);



let users = {}; // Store connected users and their socket IDs

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle setting the username
  socket.on("set username", (userId) => {
    users[userId] = socket.id; // Store user ID with socket ID
    socket.userId = userId; // Save userId on the socket instance
    console.log(`User ${userId} connected with ID ${socket.id}`);
  });

  // Listen for chat messages with an optional recipient
  socket.on("chat message", ({ msg, recipient }) => {
    if (recipient && users[recipient]) {
      // Send a private message to the recipient
      const recipientSocketId = users[recipient];
      io.to(recipientSocketId).emit("chat message", {
        msg,
        sender: socket.userId,
        private: true,
      });
    } else if (recipient && !users[recipient]) {
      // Notify the sender that the recipient was not found
      socket.emit("chat message", {
        msg: `User ${recipient} not found.`,
        sender: "",
        private: true,
      });
    } else {
      // Handle public messages if required (optional)
      io.emit("chat message", { msg, sender: socket.userId, private: false });
    }
  });

  // Handle user disconnecting
  socket.on("disconnect", () => {
    console.log(`User ${socket.userId} disconnected`);
    delete users[socket.userId]; // Remove the user from the users list
  });
});

const PORT = 8000; 

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
