require("dotenv").config()
const express = require("express")
const app = express(); //app --> Server
//configs
const connectDB = require("./config/database.js")
//npm pakages
const cookieParser = require("cookie-parser")
//Routers
const authRouter = require("./routes/auth.routes.js")
const profileRouter = require("./routes/profile.routes.js")
//middleWares

app.use(express.json())
app.use(cookieParser())

app.use("/" , authRouter)
app.use("/" , profileRouter)


 app.use("/" , (err,req,res)=>{
    console.log(err.message)
 }) //Error middleware to handle any Error

const port = process.env.PORT
connectDB().then(() => {
    console.log("MongoDB server is Connect");
    app.listen(port, () => { //it takes port to listen requets and cb which is called when server is running
        console.log(`server running on http://localhost:${port}`)
    });  // listing the request here to make sure that --> 1st mongo service is starded 
}).catch((err) => {
    console.log(err)
})
