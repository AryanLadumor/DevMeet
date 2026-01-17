const express = require("express")
const app = express(); //app --> Server

//Order of the routes matters
app.use("/test" , (req,res)=>{  
    res.send("testing api") 
})

app.use("/hello" , (req,res)=>{ //not only /work for /hello but also for /hello/any/thing
    res.send("Hello Hello")
})

// //above api will work if path invalid then this api get hit
// app.use("/",(req,res)=>{ // give the response on specific path , if path not given or (default "/") then run in all path even which  are not defined 
//     res.send("Default api")//routes that are defined below will not work
// }) // the cb is respones handler which give response to targeted request
// // if commented then below api will started working 

app.listen(6969,()=>{                //it takes port to listen requets and cb which is called when server is running
    console.log("server running on http://localhost:6969")
}); 