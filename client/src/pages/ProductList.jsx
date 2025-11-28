import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import ProductCard from "../components/ProductCard";

const categories = ["All", "Men", "Women", "Kids"];
const sizes = ["All", "S", "M", "L", "XL"];

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", 8);

    if (search) params.append("search", search);
    if (category !== "All") params.append("category", category);
    if (size !== "All") params.append("size", size);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    const res = await api.get(`/products?${params.toString()}`);
    const data = res.data;

    if (Array.isArray(data.products)) {
      setProducts(data.products);
    } else if (Array.isArray(data)) {
      setProducts(data);
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleApplyFilters = () => {
    setPage(1);
    fetchProducts();
  };

  const handleAddToCart = (productId, size, quantity) => {
    const existing = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const newItem = { productId, size, quantity };
    const updated = [...existing, newItem];
    localStorage.setItem("cartItems", JSON.stringify(updated));
    alert("Item added to cart (local demo) ");
  };

  return (
    <>
      <div className="section-header">
        <div>
          <h2 className="section-title">Browse products</h2>
          <p className="section-subtitle">
            Combine search, category, size, and price filters to test the
            backend logic for listing and filtering clothing items.
          </p>
        </div>
      </div>

      <div className="products-layout">
        <aside className="filters-panel">
          <h3 className="filters-title">Filters</h3>

          <div className="filters-group">
            <label className="filters-label">Search</label>
            <input
              className="filters-input"
              placeholder="Search by name or description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filters-group">
            <label className="filters-label">Category</label>
            <div className="filters-row">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={"chip " + (category === c ? "chip-active" : "")}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="filters-group">
            <label className="filters-label">Size</label>
            <div className="filters-row">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={"chip " + (size === s ? "chip-active" : "")}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="filters-group">
            <label className="filters-label">Price range (₹)</label>
            <div className="filters-row" style={{ gap: "0.5rem" }}>
              <input
                className="filters-input"
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                className="filters-input"
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          <button className="btn btn-outline" onClick={handleApplyFilters}>
            Apply filters
          </button>
        </aside>

        <section>
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductList;
