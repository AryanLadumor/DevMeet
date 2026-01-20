const express = require("express")
const connectDB = require("./config/database.js")
const app = express(); //app --> Server

connectDB().then(() => {
    console.log("MongoDB server is Connect");
    app.listen(6969, () => { //it takes port to listen requets and cb which is called when server is running
        console.log("server running on http://localhost:7777")
    });  // listing the request here to make sure that --> 1st mongo service is starded 
}).catch((err) => {
    console.log(err)
})

