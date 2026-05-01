const express = require("express");
const router = express.Router();

const { userAuth } = require("../middleware/auth.js");
const ConnectionRequest = require("../models/ConnectionRequest.js");
const User = require("../models/User.js");

//importing SendEmail
const sendEmail = require("../utils/sendEmail.js");

//API -> [POST /request/send/:status/:UserId] => (To send Request = interested or ignored)
router.post("/request/send/:status/:UserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.UserId;
    const status = req.params.status;

    // to Secure the dynamic api
    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      throw new Error(`Invalid Status '${status}'`);
    }

    // to secure API (not to add any other unknow Id )
    const toUser = await User.findById(toUserId);

    if (!toUser) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    // to secure API (to not sent duplicate requests)
    const exitingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (exitingConnectionRequest) {
      throw new Error("Connection Request Already Sent");
    }

    //Creating New Request
    const conRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await conRequest.save();
    //await data.populate("fromuserId" , "firstName") // here if we wan dynamic email then we can get info and send it into email
    

    //! Sending email after cnnection request
    const emailObj = {
      msg : "Connection Request sent successfull to",
      subject : "Request Sended",
      text : "YOUhave succeffuly send request",
    }
    const emailResponse = await sendEmail.run(emailObj);
    console.log(emailResponse);

    res.json({
      msg : emailObj.msg ,
      data,
    });
  } catch (error) {
    res.status(400).json({ msg: "Error: " + error.message });
  }
});

//API -> [POST //request/review/:status/:requestId] => (To Review request= accept or reject)
router.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedUser = req.user;
      const { status, requestId } = req.params;

      //to Secure the dynamic api
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid Status");
      }

      //to secure api (strick id)
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedUser,
        status: "interested", //hardcorely status should be interedted only
      });
      if (!connectionRequest) {
        return res.status(404).json({ msg: "Request Not Found" });
      }

      //changing status
      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({
        msg:
          status === "accepted"
            ? `${connectionRequest.fromUserId.firstName} now is you connection `
            : "Request rejected",
        data,
      });
    } catch (error) {
      res.status(400).json({ msg: "Error " + error.message });
    }
  },
);

module.exports = router;
