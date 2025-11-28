const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    res.json(cart || { items: [] });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const userId = req.user ? req.user._id : null;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await Cart.create({ user: userId, items: [] });

    const existingIndex = cart.items.findIndex(
      (i) => i.product.toString() === productId && i.size === size
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, size, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
