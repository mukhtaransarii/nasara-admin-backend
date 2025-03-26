const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.js");

// ✅ Update Order Status
router.put("/cart/status/:cartId", async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "Shipped", "Delivered", "Cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedCart = await Cart.findByIdAndUpdate(req.params.cartId, { status }, { new: true });

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ message: "Order status updated", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Update Payment Status
router.put("/cart/payment/:cartId", async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    if (!["Unpaid", "Paid"].includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    const updatedCart = await Cart.findByIdAndUpdate(req.params.cartId, { paymentStatus }, { new: true });

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ message: "Payment status updated", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Update Delivery Date
router.put("/cart/delivery-date/:cartId", async (req, res) => {
  try {
    const { deliveryDate } = req.body;
    if (!deliveryDate) {
      return res.status(400).json({ message: "Delivery date is required" });
    }

    const updatedCart = await Cart.findByIdAndUpdate(req.params.cartId, { deliveryDate }, { new: true });

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ message: "Delivery date updated", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Get Order Details (Frontend fetch)
router.get("/cart/:cartId", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
