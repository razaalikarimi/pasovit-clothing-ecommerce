import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { Link } from "react-router-dom";

function CheckoutPage() {
  const [cart, setCart] = useState(null);
  const [orderResult, setOrderResult] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("authToken");

  const fetchCart = async () => {
    if (!token) return;

    try {
      setLoadingCart(true);
      setError("");
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load cart for checkout");
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      setPlacingOrder(true);
      setError("");
      const res = await api.post("/orders");
      setOrderResult(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!token) {
    return (
      <div>
        <h2>Checkout</h2>
        <p>You must be logged in to place an order.</p>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    );
  }

  if (orderResult) {
    return (
      <div>
        <h2>Order Placed Successfully 🎉</h2>
        <p>Order ID: {orderResult.order?._id}</p>
        <p>Total: ₹{orderResult.order?.totalPrice}</p>
        <p>
          A confirmation email has been sent to your registered email (mock via
          Nodemailer in backend).
        </p>
        <Link to="/products">
          <button>Continue Shopping</button>
        </Link>
      </div>
    );
  }

  const total =
    cart && cart.items
      ? cart.items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        )
      : 0;

  return (
    <div>
      <h2>Checkout</h2>

      {loadingCart && <p>Loading cart...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {cart && cart.items && cart.items.length > 0 ? (
        <div>
          <h3>Order Summary</h3>
          <ul>
            {cart.items.map((item) => (
              <li key={item._id}>
                {item.product.name} ({item.size}) x {item.quantity} = ₹
                {item.product.price * item.quantity}
              </li>
            ))}
          </ul>

          <p>
            <strong>Total: ₹{total}</strong>
          </p>

          <button onClick={handlePlaceOrder} disabled={placingOrder}>
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      ) : (
        !loadingCart && <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default CheckoutPage;
