require("dotenv").config()
const express = require("express")
const app = express(); //app --> Server
//configs
const connectDB = require("./config/database.js")
//npm pakages
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
//middleWares
const {userAuth} = require("./middleware/auth.js")
//utils
const {validateSignUpData , validateLoginData} = require("./utils/validations.js")


app.use(express.json())
app.use(cookieParser())

const User = require("./models/User.js")

//API -> [POST /signup] => Add user to DB
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
        //Adding user to db
        const result = await user.save(); // All db functions will return promise
        res.send(result);
    }catch(err){
        res.send(err.message)
    }
})

//API -> [POST /login] =>to login user
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

        //decryption by using helper function in User Schema
        const isPasswordValid = await user.validatePassword(password)
        if(isPasswordValid){
            //Getting JWT by helper Funtion
            const token = await user.getJWT();

            //passing token to the cookies in the user browser
            res.cookie("token" , token , {expires : new Date(Date.now() + 3600000)})

            //logging user
            res.send("login Succefully")
        }else{
            throw new Error("Invalid credentials")
        }
    } catch (error) {
        res.send(error.message)
    }
})

//API -> [GET /user] => to fetch user profile
app.get("/profile", userAuth, async (req,res)=>{
    try {
        const user = req.user;
        res.send(user);
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
