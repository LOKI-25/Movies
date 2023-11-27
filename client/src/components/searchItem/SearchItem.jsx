import "./searchItem.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const SearchItem = ({ item, key, state, theatre, date }) => {
  console.log(`KMJ :: SearchItem :: - ${state}, ${theatre}, ${date}`);

  return (
    <div className="searchItem">
      {/* Image */}
      <img src={item.photos[0]} alt="" className="siImg" />

      {/* Movie - Title, Description, Certificate, Duration, ReleaseDate */}
      <div className="siDesc">
        <h1 className="siTitle">{item.title}</h1>
        <span className="siMovieSubtitle">{item.description}</span>
        <span className="siCertification">{item.certificate}</span>
        <span className="siSubTitle">{item.duration}</span>
        {/*<span className="siSubTitle">Released Oct 27, 2023</span>*/}
      </div>

      {/* Movie - Rating, Price, Book */}
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>item.rating</button>
          </div>
        )}
        <div className="siDetailsText">
          <span className="siPrice">${item.price}</span>
          <span className="siTax">Includes taxes and fees</span>
          <Link
            to={{
              pathname: `/movies/${item._id}/shows`,
              search: `?state=${encodeURIComponent(
                state,
              )}&theatre=${encodeURIComponent(
                theatre,
              )}&date=${encodeURIComponent(date)}`,
            }}
          >
            <button className="siBookNowButton">Get Tickets</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
