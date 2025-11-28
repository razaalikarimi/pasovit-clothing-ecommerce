const CartPage = () => {
  const items = [];
  const total = 0;

  return (
    <div className="cart-page">
      <div className="cart-card">
        <div className="cart-header">
          <div>
            <h2 className="section-title">Your cart</h2>
            <p className="section-subtitle">
              Items added from the catalog will appear here. You can add to cart
              even before logging in; checkout will link orders with your
              account.
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            Your cart is empty right now. Go to <strong>Products</strong> and
            click “Add to cart” on a few items to see the backend flow in
            action.
          </div>
        ) : (
          <>
            {/* yahan tum apna real cart items map kar sakte ho */}
            <div className="cart-summary">
              <span>Total (mock)</span>
              <span className="price">₹{total}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
