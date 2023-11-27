import React from "react";
import Seat from "../seat/Seat";

const SeatAvailability = () => {
  return (
    <div className="row">
      Unavailable : <Seat seatColor="seat-red" />
      Available : <Seat seatColor="seat-grey" />
      Selected : <Seat seatColor="seat-black" />
    </div>
  );
};

export default SeatAvailability;
