const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String,},
  cart: { type: Array, default: [] },
  totalAmount: {type: Number},
  deliveryOtp : {type: Number},
  
  // New Fields
  status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
  paymentStatus: { type: String, enum: ["Unpaid", "Paid"], default: "Unpaid" },
  deliveryDate: { type: Date, default: () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}, 
},{ timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
