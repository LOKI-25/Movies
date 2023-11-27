import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCamera,
  faLocationDot,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [state, setState] = useState("");
  const [theatre, setTheatre] = useState("");

  {
    /* Date related */
  }
  const [openDate, setOpenDate] = useState(false);
  const [date, onChange] = useState(new Date());

  {
    /* Tickets related */
  }
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    tickets: 1,
  });
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { state, theatre, date, options },
    });
    navigate("/movies", { state: { state, theatre, date, options } });
  };

  const { user } = useContext(AuthContext);

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            {/* Header - Title, Description */}
            <h1 className="headerTitle">Movie Reservation System</h1>
            <p className="headerDesc">Book your movie tickets with us</p>

            {/* Login / Register */}
            {/*{!user && <button className="headerBtn">Sign in / Register</button>}*/}

            {/* Search Bar */}
            <div className="headerSearch">
              {/* State */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faLocationDot} className="headerIcon" />
                <input
                  type="text"
                  placeholder="State"
                  className="headerSearchInput"
                  onChange={(e) => setState(e.target.value)}
                />
              </div>

              {/* Theatre */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCamera} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Theatre"
                  className="headerSearchInput"
                  onChange={(e) => setTheatre(e.target.value)}
                />
              </div>

              {/* Date */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date, "MM/dd/yyyy")}`}</span>
                {openDate && (
                  <Calendar onChange={onChange} value={date} className="date" />
                )}
              </div>

              {/* Tickets */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.tickets} tickets`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Tickets</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.tickets <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("tickets", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.tickets}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("tickets", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
