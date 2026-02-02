const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt")
const {userAuth} = require("../middleware/auth.js")
const {validateEditProfileData} = require("../utils/validations.js")

//API -> [GET /profile/view] => to fetch user profile
router.get("/profile/view", userAuth, async (req,res)=>{
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.send(error.message)
    }
})

//API -> [PATCH /profile/edit] => to update Profile
router.patch("/profile/edit" , userAuth , async (req,res)=>{
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request")
        }
        const loggedUser = req.user

        console.log(loggedUser)
        //updating into the browser(req)
        Object.keys(req.body).forEach(k => loggedUser[k] = req.body[k])
        console.log(loggedUser)

        //updating into database
        await loggedUser.save();

        res.json({
            msg : `${loggedUser.firstName} profile has benn updated`,
            data : loggedUser
        })
    } catch (err) {
        res.status(400).send(err.message)
    }
})



//API -> [PATCH /profile/password] => to change password
router.patch("/profile/password" , userAuth , async (req,res)=>{
    try {
        const {oldPassword , newPassword } = req.body;
        const loggedUser = req.user;
        
        const ispasswordValid = await bcrypt.compare(oldPassword , loggedUser.password)
        if(!ispasswordValid){
            throw new Error("INvalid Password");
        }

        const passwordhash = await bcrypt.hash(newPassword , 10 )
        loggedUser["password"] = passwordhash
        
       await loggedUser.save();

        res.json({
            msg:"password changed",
        })
    } catch (err) {
        res.status(400).send(err.message)
    }
})


module.exports = router;