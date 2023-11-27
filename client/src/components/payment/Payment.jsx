import "./payment.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Payment = () => {
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const location = useLocation();
  console.log(`KMJ :: Payment: ${JSON.stringify(location)}`);
  const [amount, setAmount] = useState(location.state.amount);
  const [seats, setSeats] = useState(location.state.seats);
  const [data, setData] = useState(location.state.data);

  const [card, setCard] = useState({
    number: undefined,
    expiry: undefined,
    secret: undefined,
    name: undefined,
    amount: undefined,
  });

  const handleChange = (e) => {
    setCard((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        card: card,
        seats: seats,
        data: data,
        user: user,
      };
      alert(JSON.stringify(payload));
      console.log(`KMJ :: Payment - Payload: ${JSON.stringify(payload)}`);
      const res = await axios.post("/bookings", payload);
      navigate("/success", { state: location.state });
    } catch (err) {
      navigate("/fail", { state: location.state });
    }
  };

  return (
    <div className="payment">
      <div className="titleContainer">
        <Link className="titleLink" to="/">
          <span className="logo">Movie Reservation System</span>
        </Link>
      </div>
      <div className="pContainer">
        <input
          type="text"
          placeholder="card number"
          id="number"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="expiry"
          id="expiry"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="secret"
          id="secret"
          onChange={handleChange}
          className="pInput"
        />
        <input
          type="text"
          placeholder="name"
          id="name"
          onChange={handleChange}
          className="pInput"
        />
        <button disabled={loading} onClick={handleClick} className="pButton">
          Pay ${amount}
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Payment;
