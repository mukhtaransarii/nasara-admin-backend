const express = require("express");
const router = express.Router();
const Product = require("../models/product.js");
const Cart = require("../models/cart.js")

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ published: true }); // Fetch only published products
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

// 📌 Place Order API
router.post("/place-order/:id", async (req, res) => {
  const { id } = req.params; // user._id from params
  const { cart, totalAmount,} = req.body;
  
  const deliveryOtp = Math.floor(Math.random() * 900000) + 100000;

  try {
    // Save order with userId in the cart database
    const newOrder = new Cart({
      userId: id, // Store user ID in the cart DB
      cart,
      totalAmount,
      deliveryOtp,
    });

    await newOrder.save();
    res.status(200).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order." });
  }
});

// for Nasara ecommerce
router.get("/get-orders/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Cart.find({ userId });
    
    res.status(200).json(orders.reverse());
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});

// ✅ Delete Order on Cancellation
router.delete("/cancel-order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    await Cart.findByIdAndDelete(orderId);
    
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// For admin Panel ui
router.get("/get-orders/", async (req, res) => {
  const orders = await Cart.find();
  res.status(200).json(orders.reverse());
});

module.exports = router;