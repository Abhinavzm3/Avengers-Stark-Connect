const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let users = {}; // Store connected users and their socket IDs

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for setting username
  socket.on("set username", (username) => {
    users[username] = socket.id; // Store username with socket ID
    socket.username = username; // Save username on socket instance
    console.log(`User ${username} connected with ID ${socket.id}`);
  });

  // Listen for chat messages with optional recipient
  socket.on("chat message", ({ msg, recipient }) => {
    if (recipient) {
      // Send a private message
      const recipientSocketId = users[recipient];
      if (recipientSocketId) {
        // Send a private message to the recipient
        io.to(recipientSocketId).emit("chat message", {
          msg,
          sender: socket.username,
          private: true,
        });
      } else {
        // Send a message to the sender indicating that the recipient was not found
        socket.emit("chat message", {
          msg: `User ${recipient} not found.`, // Only the recipient's name
          sender : ``,
          private: true,
        });
      }
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`User ${socket.username} disconnected`);
    delete users[socket.username]; // Remove user from list
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on  port 3000`);
});
