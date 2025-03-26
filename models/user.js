const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String },
    username: { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
