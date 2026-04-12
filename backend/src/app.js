require("dotenv").config();
const port = process.env.PORT;
const ip = process.env.PUBLIC_IP;
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
//middleWares
// backend/src/app.js
const corsOptions = {
  // Allow the Nginx frontend (Port 80) and the direct backend port (7777)
  origin: [`http://${ip}`, `http://${ip}:7777`],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

app.use("/", (err, req, res) => {
  console.log(err);
}); //Error middleware to handle any Error

connectDB()
  .then(() => {
    console.log("MongoDB server is Connect");
    app.listen(port, () => {
      //it takes port to listen requets and cb which is called when server is running
      console.log(`server running on http://${ip}:${port}`);
    }); // listing the request here to make sure that --> 1st mongo service is starded
  })
  .catch((err) => {
    console.log(err);
  });
