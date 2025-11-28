import { useState } from "react";

function ProductCard({ product, onAddToCart = () => {} }) {
  if (!product) return null;

  const initialSize = product?.sizes?.[0] || "M";
  const [size, setSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (!product._id) return;
    onAddToCart(product._id, size, quantity);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        <span className="badge">{product.category}</span>
      </div>

      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="pill-row">
          <span className="pill">
            Sizes: {product.sizes?.join(", ") || "N/A"}
          </span>
        </div>

        <div className="pill-row" style={{ gap: "0.5rem" }}>
          <label className="pill">
            Size{" "}
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "inherit",
              }}
            >
              {product.sizes?.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="pill">
            Qty{" "}
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{
                width: "50px",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "inherit",
              }}
            />
          </label>
        </div>

        <div className="product-footer">
          <p className="price">
            ₹{product.price} <span>/ item</span>
          </p>
          <button className="btn btn-outline" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
