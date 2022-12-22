const express = require("express");
const { connection } = require("./confige/db");
const { messageModel } = require("./model/message");
const http = require("http");
const app = express();
//const cors = require("cors");

const port = process.env.PORT || 3400;

const server = http.createServer(app);
const socketIO = require("socket.io");

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

//app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello backend working");
});

io.on("connection", async (socket) => {
  // console.log("What is sokect.: ", socket);
  console.log("socket/user connected:26");
  let payload = await messageModel.find();
  io.emit("chat", payload);
  // console.log("msgs: 28", msgs);

  socket.on("disconnect", () => {
    console.log("user Disconnect.:29");
  });
  socket.on("chat", async (payload) => {
    console.log(payload);
    let newMessage = new messageModel(payload);
    await newMessage.save();

    io.emit("chat", payload);
  });
});

// LISTENING SERVER.
server.listen(port, async () => {
  try {
    console.log("connecting to db");
    await connection;
    console.log("db connected");

    console.log(`server is runningon on ${port}`);
  } catch (err) {
    console.log("connection err: ", err);
    console.log("unable to connect with db");
  }
});
