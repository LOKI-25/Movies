import "./adminhome.css";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  const UsersHandle = () => {
    navigate("/users");
  };

  const MovieHandle = () => {
    navigate("/allmovies");
  };

  const TheaterHandle = () => {
    navigate("/theaters");
  };

  return (
    <div>
      <Navbar />

      <div className="homeContainer">
        <button onClick={UsersHandle}>Users</button>
        <button onClick={MovieHandle}>Movies</button>
        <button onClick={TheaterHandle}>Theater</button>

        <Footer />
      </div>
    </div>
  );
};

export default AdminHome;
