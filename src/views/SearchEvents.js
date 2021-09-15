import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import "../css/Search.css";
import "../css/ListEvents.css";


export const SearchEvents = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const updateSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const loadevent = (e) => {
    e.preventDefault();
    if (searchQuery.length === 0) {
      alert("Veuillez saisir un mot");
      return;
    }
    fetchDataWithFilter();
  };

  const fetchDataWithFilter = async () => {
    const data = await fetch(
      `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?limit=10&search=${searchQuery}&pretty=false&timezone=UTC`
    );
    const result = await data.json();
    setData(result);
  };

  return (
    <>
      <div>
        <form className="formSearchData">
          <label>Retrouver les futurs évènements à faire à Paris</label>
          <input
            name="search"
            className="SearchQuery"
            onInput={updateSearchQuery}
          />
          <button onClick={loadevent} className="btnSearch">
            Rechercher
          </button>
        </form>

        <ul className="listEvents">
          <li>
            <div>
              {data?.records?.map((event, index) => (
                <Link
                  to={`/listevents/${event.record.id}`}
                  className="linkeventdetail"
                >
                  <div key={index}>
                    <figure className="imageEvents">
                      <figcaption>
                        <img
                          src={event.record.fields.cover_url}
                          alt="imcover"
                          width="40%"
                          height="40%"
                        />
                      </figcaption>
                    </figure>
                    <div>
                      <p>{event.record.fields.title}</p>
                      <div>{event.record.fields.date_start}</div>
                      <div>{event.record.fields.lead_text}</div>
                      <button>{FaHeart}favoris</button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SearchEvents;
