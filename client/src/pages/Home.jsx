import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-kicker">Backend-focused demo store</p>
        <h1 className="hero-title">
          Welcome to <span className="hero-gradient">Pasovit Clothing</span>
        </h1>

        <p className="hero-subtitle">
          Browse trendy outfits for Men, Women, and Kids. This shopping app
          highlights backend features like secure authentication, smart product
          filters, persistent carts, mock checkout, and email notifications.
        </p>

        <div className="hero-row">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/products")}
          >
            Start Shopping
          </button>
          <button
            className="btn btn-outline"
            onClick={() => navigate("/register")}
          >
            Create an account
          </button>
        </div>

        <div className="hero-meta">
          <span>
            <strong>20+</strong> demo products
          </span>
          <span>
            <strong>Real</strong> MongoDB orders
          </span>
          <span>
            <strong>Mock</strong> checkout &amp; emails
          </span>
        </div>
      </div>
    </section>
  );
};

export default Home;
