import "./register.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [registerDetails, setRegisterDetails] = useState({
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    phone: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setRegisterDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("/auth/register", registerDetails);
      dispatch({ type: "REGISTER_SUCCESS", payload: {} });
      navigate("/");
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  const { user, loading, error, dispatch } = useContext(AuthContext);

  return (
    <div className="register">
      <div className="titleContainer">
        <Link className="titleLink" to="/">
          <span className="logo">Movie Reservation System</span>
        </Link>
      </div>
      <div className="rContainer">
        <input
          type="text"
          placeholder="firstname"
          id="firstname"
          onChange={handleChange}
          className="rInput"
        ></input>
        <input
          type="text"
          placeholder="lastname"
          id="lastname"
          onChange={handleChange}
          className="rInput"
        ></input>
        <input
          type="text"
          placeholder="phone"
          id="phone"
          onChange={handleChange}
          className="rInput"
        ></input>
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="rInput"
        ></input>
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="rInput"
        ></input>
        <button disabled={loading} onClick={handleClick} className="lButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
