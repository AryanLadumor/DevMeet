require("dotenv").config();

const port = process.env.PORT;
const ip = process.env.PUBLIC_IP;
const frontend_url = process.env.FRONTEND_URL
const express = require("express");
var cors = require("cors");
const app = express(); //app --> Server
//configs
const connectDB = require("./config/database.js");
//npm pakages
const cookieParser = require("cookie-parser");
//Routers
const authRouter = require("./routes/auth.routes.js");
const profileRouter = require("./routes/profile.routes.js");
const requestRouter = require("./routes/request.routes.js");
const userRouter = require("./routes/user.routes.js");
const chatRouter = require("./routes/chat.routes.js")

//cron jobs
require("./utils/cronJobs.js")

//for creatingsocket.io server
const http = require("http");
const initializeSocket = require("./utils/socket.js");



const corsOptions = {
  origin: frontend_url,
  credentials: true,  
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});//Error middleware to handle any Error


//created server using express application
const server = http.createServer(app)
//we will need this server for configuration of scoket.io

initializeSocket(server);


   

connectDB()
  .then(() => {
    console.log("MongoDB server is Connect");

    //instead of app.listen we gor for server.listen for socket.io
    server.listen(port, () => {
      //it takes port to listen requets and cb which is called when server is running
      console.log(`server running on http://${ip}:${port}`);
    }); // listing the request here to make sure that --> 1st mongo service is starded


  })
  .catch((err) => {
    console.log(err);
  });
