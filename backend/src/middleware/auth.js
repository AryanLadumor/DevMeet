const jwt = require("jsonwebtoken")
const User = require("../models/User")

const userAuth = async (req,res,next) =>{
    try {
        //Reading the token
        const {token} = req.cookies
        if(!token){
            throw new Error("Please Login")
        }
        //verifying the token
        const decodedMsg = await jwt.verify(token , process.env.JWT_SECRET)
        if(!decodedMsg){
            throw new Error("please Login")
        }
        const {_id} = decodedMsg
        const user = await User.findOne({_id})
        if(!user){
            throw new Error("User Not Foound")
        }
        req.user = user;
        next()
    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = {userAuth}