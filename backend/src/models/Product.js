const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    category: { type: String, enum: ["Men", "Women", "Kids"] },
    sizes: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
