const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number},
  category: { type: String },
  quantity: { type: Number},
  unit: { type: String},
  description: { type: String },
  author: { type: String, default: "Admin" },
  images: { type: [String]},
  published: { type: Boolean, default: true },
},{ timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
