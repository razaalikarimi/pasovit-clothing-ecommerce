import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosClient";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
      setSize(res.data.sizes?.[0] || "");
    } catch (err) {
      console.error(err);
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!size) {
      alert("Please select a size");
      return;
    }

    try {
      await api.post("/cart/add", { productId: product._id, size, quantity });
      alert("Item added to cart");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ maxWidth: "300px", maxHeight: "300px", objectFit: "cover" }}
      />
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>
          <strong>₹ {product.price}</strong>
        </p>
        <p>Category: {product.category}</p>

        <div style={{ marginTop: "1rem" }}>
          <label>
            Size:{" "}
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              {product.sizes?.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginTop: "0.5rem" }}>
          <label>
            Qty:{" "}
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 1)}
              style={{ width: "70px" }}
            />
          </label>
        </div>

        <button style={{ marginTop: "1rem" }} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
