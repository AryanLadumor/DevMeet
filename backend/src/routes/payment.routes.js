const express = require("express");
const { userAuth } = require("../middleware/auth");
const router = express.Router();
const razorpay = require("../utils/razorpay");
const {membershipAmount} = require("../utils/constants")
const Payment = require("../models/Payment");

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

module.exports = router;
