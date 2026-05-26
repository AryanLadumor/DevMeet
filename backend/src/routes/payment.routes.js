const express = require("express");
const { userAuth } = require("../middleware/auth");
const router = express.Router();
const razorpay = require("../utils/razorpay");
const {membershipAmount} = require("../utils/constants")
const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils')

const Payment = require("../models/Payment");
const User = require("../models/User");

router.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName,emailId } = req.user;

    //creating a order
    const order = await razorpay.orders.create({
      amount: membershipAmount[membershipType],
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType,
      },
    });

    //saving details in database
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    //sending response to database
    res.json({ ...savedPayment.toJSON() , keyId:process.env.RAZORPAY_KEY_ID}); //passing keyId so wecan use it on payment dialogbox
  } catch (error) {
    res.status(500).json({ err: error.message });
    console.log(error);
  }
});

router.post("/payment/webhook" , async(req,res)=>{
  try {
    const webhookSignature = req.get["X-Razorpay-Signature"]
    const isWebhookValid =  validateWebhookSignature(JSON.stringify(req.body), webhookSignature, process.env.RAZORPAY_WEBHOOK_SECRET)

    if(!isWebhookValid){
      return res.status(400).json({msg:"Webhook signature isinvalid"})
    }

    const paymentDetails = req.body.payload.payment.entity;

    // update my payment status in DB
    const payment = await Payment.findOne({orderId : paymentDetails.order_id})
    payment.status = paymentDetails.status
    await payment.save()


    // update the user as premium
    const user = await User.findOne({_id : payment.userId})
    user.isPremium = true;
    user.memebershipType = payment.notes.membershipType
    await user.save();

    
    //after our webhook is verified they give us acess to some events 
    // if(req.body.event === "payment.captured"){
      
    // }
    // if(req.body.event === "payment.failed"){
      
    // }
    
    //return sucess response to razorpay
    res.status(200).json({msg:"Webhook Recived Successfully"})
  } catch (error) {
    console.dir(error)
  }
})


module.exports = router;
