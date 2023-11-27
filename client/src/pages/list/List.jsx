import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import SearchItem from "../../components/searchItem/SearchItem";
import Calendar from "react-calendar";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();

  {
    /* Read the inputs from the location */
  }
  const [state, setState] = useState(location.state.state);
  const [theatre, setTheatre] = useState(location.state.theatre);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [tickets, setTickets] = useState(undefined);

  const [openDate, setOpenDate] = useState(false);
  const [openOptions, seOpenOptions] = useState(false);

  // const fetchUrl = `/theatres/search?state=${state}&theatre=${theatre}&date=11/05/2023}`;
  const fetchUrl = `/theatres/search?state=${state}&theatre=${theatre}&date=${date}`;
  const { data, loading, error, reFetch } = useFetch(fetchUrl);
  console.log(`KMJ :: Search - URL: ${fetchUrl}`);
  console.log(`KMJ :: Search - data\n: ${JSON.stringify(data)}`);

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>

            {/* State */}
            <div className="lsItem">
              <label>State</label>
              <input
                type="text"
                onChange={(e) => setState(e.target.value)}
                placeholder={state}
              ></input>
            </div>

            {/* Theatre */}
            <div className="lsItem">
              <label>Theatre</label>
              <input
                type="text"
                onChange={(e) => setTheatre(e.target.value)}
                placeholder={theatre}
              ></input>
            </div>

            {/* Date */}
            <div className="lsItem">
              <label>Date</label>
              <span
                onClick={() => setOpenDate(!openDate)}
                className="headerSearchText"
              >{`${format(date, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <Calendar onChange={setDate} value={date} className="date" />
              )}
            </div>

            {/* Tickets */}
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Tickets</span>
                  <input
                    type="number"
                    onChange={(e) => setTickets(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>

          {/* Movie Results */}
          <div className="listResult">
            {loading ? (
              "Loading..."
            ) : (
              <>
                {data["movies"]?.map((item) => (
                  <SearchItem
                    item={item}
                    key={item._id}
                    shows={data["shows"][item.title]}
                    state={state}
                    theatre={theatre}
                    date={date}
                  />
                ))}
                {/*<p>Something happening</p>*/}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
