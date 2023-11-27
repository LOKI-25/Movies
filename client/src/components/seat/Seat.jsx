import React, { useContext } from "react";

import "./seat.css";
import MovieContext from "../../context/MovieContext";

const Seat = (props) => {
  const { show } = useContext(MovieContext);
  const context = useContext(MovieContext);

  const seatNumber = props.seatno;
  // const seatStatus = props.seatColor ? props.seatColor : "seat-grey";
  const seatStatus = props.seatColor
    ? props.seatColor
    : props.isAvailable
    ? "seat-grey"
    : "seat-red";

  const seatClickHandler = (event, seatNumber) => {
    event.stopPropagation();

    const seatColor = document.querySelector(`.seat-${seatNumber}`).classList;
    const availableSeats = show.available_seats;
    const reservedSeats = show.reserved_seats;
    const booked = show.booked;

    const isSeatSelected = availableSeats.includes(seatNumber);

    const printStatus = () => {
      console.log(`KMJ :: seatClickHandler available - ${availableSeats}`);
      console.log(`KMJ :: seatClickHandler reserved - ${reservedSeats}`);
      console.log(`KMJ :: booked - ${booked}`);
    };

    // console.log(
    //   `KMJ :: Seat:seatClickHandler - ${seatNumber} -> ${isSeatSelected}`,
    // );
    // printStatus();

    if (isSeatSelected && !booked.includes(seatNumber)) {
      seatColor.remove("seat-grey");
      seatColor.add("seat-black");

      context.changeState({
        ...show,
        booked: [...show.booked, seatNumber],
        booked_seats: show.booked_seats + 1,
      });
      // printStatus();
    } else if (isSeatSelected && booked.includes(seatNumber)) {
      seatColor.remove("seat-black");
      seatColor.add("seat-grey");

      const newMovieSeats = show.booked.filter((seat) => seat !== seatNumber);
      context.changeState({
        ...show,
        booked: newMovieSeats,
        booked_seats: show.booked_seats - 1,
      });
      // printStatus();
    }
  };

  return (
    <div className="col-2 col-md-2">
      <div
        className={`seat seat-${seatNumber} ${seatStatus}`}
        onClick={(e) => seatClickHandler(e, props.seatno)}
      >
        <span>{seatNumber}</span>
      </div>
    </div>
  );
};

export default Seat;
