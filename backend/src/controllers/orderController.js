const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const sendEmail = require("../utils/sendEmail");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    let totalPrice = 0;
    const items = cart.items.map((item) => {
      const price = item.product.price;
      totalPrice += price * item.quantity;
      return {
        product: item.product._id,
        size: item.size,
        quantity: item.quantity,
        price,
      };
    });

    const order = await Order.create({
      user: userId,
      items,
      totalPrice,
    });

    const html = `
      <h2>Order Confirmation</h2>
      <p>Order ID: ${order._id}</p>
      <p>Order Date: ${order.orderDate.toDateString()}</p>
      <h3>Items:</h3>
      <ul>
        ${cart.items
          .map(
            (item) =>
              `<li>${item.product.name} - ${item.size} x ${item.quantity} = ₹${
                item.product.price * item.quantity
              }</li>`
          )
          .join("")}
      </ul>
      <h3>Total: ₹${totalPrice}</h3>
    `;

    await sendEmail({
      to: req.user.email,
      subject: "Your Pasovit Clothing Order Confirmation",
      html,
    });

    cart.items = [];
    await cart.save();

    res.json({ message: "Order placed", order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
