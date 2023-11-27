import "./movie.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import SeatLayout from "../../components/seatLayout/SeatLayout";
import PriceCalculator from "../../components/priceCalculator/PriceCalculator";
import SeatAvailability from "../../components/seatAvailability/SeatAvailability";
import MovieContext from "../../context/MovieContext";
const Movie = () => {
  const location = useLocation();

  // console.log(`KMJ :: Location - ${JSON.stringify(location)}`);
  const pathTokens = location.pathname.split("/");
  const movieId = pathTokens[2];

  // Extracting individual parameters
  const searchParams = new URLSearchParams(location.search);
  const state = searchParams.get("state");
  const theatre = searchParams.get("theatre");
  const dateParam = searchParams.get("date");
  const formattedDate = new Date(dateParam).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const fetchUrl = `/movies/${movieId}/shows?state=${state}&theatre=${theatre}&date=${formattedDate}`;
  const { data, loading, error } = useFetch(fetchUrl);
  console.log(`KMJ :: Movie.jsx - URL: ${fetchUrl}`);
  // console.log(`KMJ :: Movie.jsx - data\n: ${JSON.stringify(data)}`);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = () => {
    // if (user) {
    //   setOpenModal(true);
    // } else {
    //   navigate("/login");
    // }
    navigate("/payment", {
      state: {
        amount: show.booked_seats * show.price,
        data: data,
        seats: show.booked,
      },
    });
  };

  const [show, setShow] = useState({
    movie: data && data["movie"] ? data : {},
    price: data && data["movie"] ? data["movie"]["price"] : 0,
    total_seats:
      data && data["movie"]
        ? data["shows"][data["movie"]["title"]][0]["total_seats"]
        : 0,
    available_seats:
      data && data["movie"]
        ? data["shows"][data["movie"]["title"]][0]["available_seats"]
        : [],
    reserved_seats:
      data && data["movie"]
        ? data["shows"][data["movie"]["title"]][0]["reserved_seats"]
        : [],
  });

  useEffect(() => {
    if (!loading && data && data.movie) {
      setShow({
        movie: data.movie,
        price: data.movie.price || 0,
        total_seats: data.shows[data.movie.title][0].total_seats || 0,
        available_seats: data.shows[data.movie.title][0].available_seats || [],
        reserved_seats: data.shows[data.movie.title][0].reserved_seats || [],
        seatNumbers:
          [
            ...data.shows[data.movie.title][0].available_seats,
            ...data.shows[data.movie.title][0].reserved_seats,
          ] || [],
        booked_seats: 0,
        booked: [],
      });
    }
  }, [loading, data]);

  return (
    <div>
      <Navbar />
      <Header type="list" />

      {loading ? (
        "Loading..."
      ) : data ? (
        <>
          <div className="movieContainer">
            <div className="movieWrapper">
              {/* Theatre Name */}
              <h1 className="movieTitle">{theatre}</h1>

              {/* Theatre Address */}
              <div className="movieAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>
                  {state}
                  {/*|| {data["shows"][data["movie"]["title"]][0]["city"]}{" "}*/}
                  {/*|| {data["shows"][data["movie"]["title"]][0]["zipcode"]}*/}
                </span>
              </div>
              {data && data["movie"] && (
                <div className="movieImages">
                  {data["movie"]["photos"].map((photo, i) => (
                    <div className="movieImgWrapper" key={i}>
                      <img src={photo} alt="" className="movieImg" />
                    </div>
                  ))}
                </div>
              )}
              <div className="movieDetails">
                {/* Movie - Title, Description */}
                <div className="movieDetailsText">
                  {data && data["movie"] && (
                    <>
                      <h1 className="movieTitle">{data["movie"]["title"]}</h1>
                      <p className="movieDesc">
                        {data["movie"]["description"]}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {data && data["movie"] && (
                <div className="main container">
                  <MovieContext.Provider value={{ show, changeState: setShow }}>
                    <SeatLayout
                      availableSeats={show.available_seats}
                      reservedSeats={show.reserved_seats}
                    />
                    <SeatAvailability />
                    <PriceCalculator />
                  </MovieContext.Provider>
                </div>
              )}

              {/* Button */}
              <button className="bookNow" onClick={handleClick}>
                Get Tickets
              </button>
            </div>
            <Footer />
          </div>
        </>
      ) : (
        <div>No data </div>
      )}
    </div>
  );
};

export default Movie;
