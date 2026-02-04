const express = require("express")
const router = express.Router()

const { userAuth } = require("../middleware/auth.js")
const ConnectionRequest = require("../models/ConnectionRequest.js")
const User = require("../models/User.js")

router.post("/request/send/:status/:UserId", userAuth ,  async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.UserId
        const status = req.params.status;
        
        // to Secure the dynamic api
        const allowedStatus = ["interested" , "ignored"]
        if(!allowedStatus.includes(status)){
            throw new Error(`Invalid Status '${status}'`)
        }

        // to secure API (not to add any other Id)
        const toUser = await User.findById(toUserId)
        console.log(toUser)
        if(!toUser){
            return res.status(404).json({msg:"User Not Found"})
        }


        // to secure API (to not sent duplicate requests)
        const exitingConnectionRequest = await ConnectionRequest.findOne({
            $or : [
                {fromUserId,toUserId},
                {fromUserId:toUserId ,toUserId:fromUserId},
            ]
        })
        if(exitingConnectionRequest){
            throw new Error("Connection Request Already Sent")
        }

        //Creating New Request
        const conRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        console.log(conRequest)
        const data = await conRequest.save()

        res.json({
            msg : "Connection Request sent successfully",
            data,
        })
    } catch (error) {
        res.status(400).json({msg : "Error: "  + error.message})
    }
})

module.exports = router;




