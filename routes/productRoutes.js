const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Product = require("../models/product.js");

// 🔹 Configure Multer (Temporary Storage)
const upload = multer({ dest: "uploads/" });

// 🔹 Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// 🔹 Route to Upload Product
router.post("/add", upload.array("images", 5), async (req, res) => {
  try {
    const { title, price,originalPrice, category, quantity, unit, description, author } = req.body;

    // 🔹 Upload Images to Cloudinary
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const uploadResponse = await cloudinary.uploader.upload(file.path, {
          folder: "nasara-products",
        });

        // Remove file after upload
        fs.unlinkSync(file.path);

        return uploadResponse.secure_url;
      })
    );

    // 🔹 Store Product in Database
    const newProduct = await Product.create({
      title,
      price,
      category,
      quantity,
      unit,
      description,
      author,
      images: uploadedImages, // Store only URLs
      originalPrice, 
    });

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
});

// 🔹 GET PRODUCT FOR ADMIN PENAL
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});


// Update product (Publish/Unpublish, Edit)
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
});

module.exports = router;
