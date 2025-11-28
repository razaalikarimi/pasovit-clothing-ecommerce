import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " nav-link-active" : "");

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand-wrap">
          <NavLink to="/" className="navbar-brand">
            Pasovit Clothing
          </NavLink>
        </div>

        <nav className="nav-links">
          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            Cart
          </NavLink>

          {user ? (
            <>
              <span className="nav-user">Hi, {user.name}</span>
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
