import Seat from "../seat/Seat";

const GenerateSeats = (seatNumbers) => {
  return (
    <div className="row">
      {seatNumbers.map((seatNumber) => {
        return <Seat seatno={seatNumber} key={seatNumber} />;
      })}
    </div>
  );
};

const SeatLayout = ({ availableSeats, reservedSeats }) => {
  // console.log(
  //   `KMJ :: SeatLayout - Available -> Reserved ${availableSeats} -> ${reservedSeats}`,
  // );
  const allSeats = Array.from(
    new Set([...availableSeats, ...reservedSeats]),
  ).sort((a, b) => a - b);

  const generateSeatComponents = (seatNumbers) => {
    return (
      <div className="row">
        {seatNumbers.map((seatNumber) => {
          const isReserved = reservedSeats.includes(seatNumber);
          const isAvailable = availableSeats.includes(seatNumber);
          return (
            <Seat
              seatno={seatNumber}
              key={seatNumber}
              isReserved={isReserved}
              isAvailable={isAvailable}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="movie-complex">
      <p>Screen This way!</p>
      <div className="container row movie-layout">
        <div className="movie-column-1">{generateSeatComponents(allSeats)}</div>
        {/* Add other columns if needed */}
      </div>
    </div>
  );
};

export default SeatLayout;
