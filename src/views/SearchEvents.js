import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";
import "../css/Search.css";

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
      `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?limit=20&search=${searchQuery}&pretty=false&timezone=UTC`
    );
    const result = await data.json();
    setData(result);
  };
  const addToFavoriteList = (eventRecord) => {
    let myfav = JSON.parse(localStorage.getItem("myfav")) || [];

    const hasEventRecord = myfav.some(
      (element) => element.id === eventRecord.id
    );
    if (hasEventRecord) {
      alert("Cet element  existe déjà en favori");
      return;
    }

    myfav.push(eventRecord);
    localStorage.setItem("myfav", JSON.stringify(myfav));
    alert("Cet element vient d'être ajouté en favoris");
  };

  const removeToFavoriteList = (id) => {
    let myfav = JSON.parse(localStorage.getItem("myfav")) || [];
    const removeArr = myfav.filter((element) => element.id !== id);
    localStorage.setItem("myfav", JSON.stringify(removeArr));
    alert("Cet element a été supprimé");
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
          <li class="list">
            <div className="ii">
              {data?.records?.map((event, index) => (
                <div key={index} className="infos">
                  <Link
                    to={`/detailevents/${event.record.id}`}
                    className="linkeventdetail"
                  >
                    <figure className="imageEvents">
                      <figcaption>
                        <img
                          src={event.record.fields.cover_url}
                          alt="imcover"
                          width="90%"
                          height="auto"
                        />
                      </figcaption>
                    </figure>
                  </Link>
                  <div className="infobox">
                    <p className="title">{event.record.fields.title}</p>
                    <div className="date">
                      {new Date(
                        event.record.fields.date_start
                      ).toLocaleDateString()}{" "}
                    </div>
                    <div className="description">
                      {event.record.fields.lead_text}
                    </div>
                    <div className="buttons">
                      <button onClick={() => addToFavoriteList(event.record)} className="btnfav" >
                        <FaHeart />
                      </button>
                      <button onClick={() => removeToFavoriteList(event.record.id)} className="btnfav">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SearchEvents;
