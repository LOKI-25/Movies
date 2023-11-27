import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleAdminLogin = () => {
    navigate("/adminlogin");
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT", payload: {} });
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Movie Reservation System</span>
        </Link>
        {user && user.email ? (
          <div className="navItems">
            <span>{user.email}</span>
            <button onClick={handleLogout} className="navButton">
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button onClick={handleRegister} className="navButton">
              Register
            </button>
            <button onClick={handleLogin} className="navButton">
              Login
              </button>
            <button onClick={handleAdminLogin} className="navButton">
              Login as admin
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
