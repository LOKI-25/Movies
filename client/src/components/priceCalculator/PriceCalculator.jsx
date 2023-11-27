import React, { useContext } from "react";
import MovieContext from "../../context/MovieContext";

const PriceCalculator = () => {
  const { show } = useContext(MovieContext);
  const context = useContext(MovieContext);

  return (
    <div>
      <p>
        Selected {show.booked_seats} seats and the total price is $
        {show.booked_seats * show.price}
      </p>
    </div>
  );
};

export default PriceCalculator;
