import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <FeaturedProperties />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
