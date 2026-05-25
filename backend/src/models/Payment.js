const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    paymentId: {
      type: String,
      index: true,
    },
    signature: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
      default: "INR",
    },
    receipt: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["created", "attempted", "paid", "failed"],
        message: "{VALUE} is not a valid payment status",
      },
      default: "created",
    },
    notes: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      membershipType: {
        type: String,
        enum: {
          values: ["silver", "gold"],
          message: "{VALUE} is not a valid membership type",
        },
      },
    },
  },
  { timestamps: true },
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
