import "./footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">States</li>
          <li className="fListItem">Theatres</li>
          <li className="fListItem">Movies</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">IMAX</li>
          <li className="fListItem">Dolby Cinema</li>
          <li className="fListItem">RealD 3D</li>
          <li className="fListItem">Laser</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Theatre Rentals</li>
          <li className="fListItem">International Films</li>
          <li className="fListItem">Special Events</li>
        </ul>
      </div>
      <div className="fText">© Copyright 2023 Movie Reservation System</div>
    </div>
  );
};

export default Footer;
