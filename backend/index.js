import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import bookMark  from "./routes/bookMark.route.js";
import blogRoute from './routes/blog.routes.js'

dotenv.config({});

const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    // origin:'https://stark-connect.netlify.app',
    // origin:'https://stark-connect-seven.vercel.app/',
    credentials:true
}

app.get('/',(req,res)=>{
    res.send("this is backend on 3000 port")
})

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/bookmark",bookMark);
app.use("/api/v1/blog",blogRoute);













// socket setup

import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from your React app
    methods: ["GET", "POST"]
  }
});

let users = {}; 

// Set up socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("set username", (username) => {
    if (!username) {
      console.error("Username is missing");
      return;
    }
    users[username] = socket.id; 
    socket.username = username; 
    console.log(`User ${username} connected with ID ${socket.id}`);
  });

  socket.on("chat message", ({ msg, receiver }) => {
    if (!msg || msg.trim() === "") {
      socket.emit("chat message", { msg: "Message cannot be empty.", sender: "", private: false });
      return;
    }

    if (receiver && users[receiver]) {
      const receiverSocketId = users[receiver];
      io.to(receiverSocketId).emit("chat message", {
        msg,
        sender: socket.username,
        receiver,
        private: true,
      });
      console.log(`Private message sent to ${receiver}`);
    } else if (receiver && !users[receiver]) {
      socket.emit("chat message", {
        msg: `User ${receiver} not found.`,
        sender: "",
        private: true,
      });
      console.log(`Receiver ${receiver} not found`);
    } else {
      io.emit("chat message", { msg, sender: socket.username, private: false });
      console.log(`Broadcast message from ${socket.username}: ${msg}`);
    }
  });

  
  socket.on("disconnect", () => {
    console.log(`User ${socket.username} disconnected`);
    delete users[socket.username]; 
  });
});

server.listen(PORT, () => {
  connectDB(); 
  console.log(`Server running on port ${PORT}`);
});






































// app.listen(PORT,()=>{
//     connectDB();
//     console.log(`Server running at port ${PORT}`);
// })