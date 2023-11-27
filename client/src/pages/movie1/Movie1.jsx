import React, { useState } from "react";
import "./movie1.css";
import SeatLayout from "../../components/seatLayout/SeatLayout";
import SeatAvailability from "../../components/seatAvailability/SeatAvailability";
import PriceCalculator from "../../components/priceCalculator/PriceCalculator";
import MovieContext from "../../context/MovieContext";

const Movie1 = () => {
  const [movies, EditMovies] = useState({
    movieNames: {
      Bloodshot: 10,
      "The girl on the Train": 8,
      "The invisible Man": 11,
      Onward: 12,
      "My Spy": 9,
    },
    moviePrice: 10,
    totalSeats: 0,
    seatNumbers: [],
  });

  return (
    <div className="main container">
      <MovieContext.Provider value={{ movies, changeState: EditMovies }}>
        <SeatLayout />
        <SeatAvailability />
        <PriceCalculator />
      </MovieContext.Provider>
    </div>
  );
};

export default Movie1;
