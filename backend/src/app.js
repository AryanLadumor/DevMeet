require("dotenv").config()
const express = require("express")
const connectDB = require("./config/database.js")
const bcrypt = require("bcrypt")

const {validateSignUpData , validateLoginData} = require("./utils/validations.js")


const app = express(); //app --> Server

app.use(express.json())
const User = require("./models/User.js")

//API-> [POST /signup] =>add user to database
app.post("/signup" , async (req,res)=>{
    try{
        //1. validation of data
        validateSignUpData(req)
        //Encrypt of password and store to DB
        const {firstName , lastName , emailId , password,age,about,gender,skills,photoURL} = req.body
        const passwordHash = await bcrypt.hash(password , 10);
        const user = new User({ 
           firstName,
           emailId,
           password:passwordHash,
           ...(lastName && {lastName}),
           ...( age && {age}),
           ...( about && {about} ),
           ...( gender && {gender} ),
           ...( skills && {skills}),
           ...(photoURL && {photoURL})
        })
        const result = await user.save(); // return promise
        res.send(result);
    }catch(err){
        res.send(err.message)
    }
})


//API -> [POST /login]->to login user
app.post("/login" , async(req,res)=>{
    try {
        //validations
        validateLoginData(req)
        //Finding If user exits with email
        const {emailId , password} = req.body

        const user  = await User.findOne({emailId})
        if(!user){
            throw new Error("Invalid Credentials")
        }
        //decryption
        const isPasswordValid = await bcrypt.compare(password , user.password)
        if(!isPasswordValid){
            throw new Error("Invalid credentials")
        }
        res.send("login Succefully")
    } catch (error) {
        res.send(error.message)
    }
    
})



//API-> [UPDATE /user] -> to delete users by email
app.patch("/user/:userId" , async (req,res)=>{
    try{
        const id = req.params?.userId;
        const data = req.body;
        const ALLOWED_UPDATES = ["password" , "photoURL" , "about" , "skills"] //Allowed update
        const isUpdateAllowed = Object.keys(data).every(k=>ALLOWED_UPDATES.includes(k)); 
        if(!isUpdateAllowed){
            return res.status(400).send(`Only those fields [ password, photoURL, about, skills] can be updated`);
        }
        const updatedUser = await User.findByIdAndUpdate(id,data,{new:true , upsert:true , runValidators : true});
        if(!updatedUser){
            return res.send("no such user found");
        }
        res.send(updatedUser);
    }catch(err){
        res.status(400).send(err.message)
    }
})

//API-> [DELETE /user] -> to delete users by email
app.delete("/user/:userId" , async (req,res)=>{
    const id = req.params.userId;
    try{
        const deletedUser = await User.findByIdAndDelete(id) //
        res.send(deletedUser)    
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

 app.use("/" , (err,req,res)=>{
    console.log(err)
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

