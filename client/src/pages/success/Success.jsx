import React, { useState } from "react";
import "./success.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import { Margin, usePDF } from "react-to-pdf";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { movieName, seatNumbers, screenNumber, duration, time, orderNo } =
    useParams();

  const [data, setData] = useState(location.state.data);
  const [seats, setSeats] = useState(location.state.seats);

  const handleClick = () => {
    navigate("/");
  };

  const { toPDF, targetRef } = usePDF({
    filename: "download.pdf",
    page: { margin: Margin.MEDIUM },
  });

  return (
    <div className="success-page">
      <h1>Success!</h1>
      <p>Your action was successful.</p>

      <div ref={targetRef}>
        <div className="ticket-summary">
          <h2>Ticket Summary</h2>
          <p>Movie: {data["movie"]["title"]}</p>
          <p>
            Theatre: {data["shows"][data["movie"]["title"]][0]["theatre_name"]}
          </p>
          <p>Seat Numbers: {seats}</p>
          <p>
            Screen Number:{" "}
            {data["shows"][data["movie"]["title"]][0]["screen_name"]}
          </p>
          <p>Duration: {data["movie"]["duration"]}</p>
          <p>Time: {data["shows"][data["movie"]["title"]][0]["start"]}</p>
          <p>Order Number: {orderNo}</p>
        </div>

        <div className="qr-code">
          <QRCode value={orderNo} />
        </div>
      </div>

      <button className="success-button" onClick={handleClick}>
        Go Back
      </button>

      <button className="success-button" onClick={toPDF}>
        Download
      </button>
    </div>
  );
};

export default SuccessPage;
