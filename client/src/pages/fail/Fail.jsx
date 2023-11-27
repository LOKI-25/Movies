import "./fail.css";
import { useLocation, useNavigate } from "react-router-dom";

const FailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/payment", { state: location.state });
  };
  return (
    <div className="fail-page">
      <h1>Failure!</h1>
      <p>Something went wrong.</p>
      <button className="fail-button" onClick={handleClick}>
        Try Again
      </button>
    </div>
  );
};

export default FailPage;
