import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import "../css/LastEvents.css";
import { Link } from "react-router-dom";

export const LastEvents = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/?&rows=1&sort=updated_at%20desc;"
    );
    const result = await data.json();
    setData(result);
  };

  const addToFavoriteList = (eventRecord) => {
    let myfav = JSON.parse(localStorage.getItem('myfav')) || [];

    const hasEventRecord = myfav.some((element) => element.id === eventRecord.id)
    if (hasEventRecord) {
      alert('Cet element  existe déjà en favori')
      return
    }

    myfav.push(eventRecord);
    localStorage.setItem('myfav', JSON.stringify(myfav));
    alert("Cet element vient d'être ajouté en favoris")
  };

  const removeToFavoriteList = (id) => {
      let todos = JSON.parse(localStorage.getItem('myfav')) || []
      const removeArr = todos.filter(element => element.id !== id)
      localStorage.setItem('myfav', JSON.stringify(removeArr))
      alert('Cet element a été supprimé')
  }

  return (
    <div>
      {data?.records?.map((event, index) => (
      <div className="links" key={index}>
          <div className="containerevents">
            <Link to={`/listevents/${event.record.id}`}>
              <figure>
                <figcaption>
                  <img
                    src={event.record.fields.cover_url}
                    alt="imagecover"
                    width="80%"
                    height="50%" />
                </figcaption>
              </figure>
            </Link>

            <div className="eventinfo">
              <p className="titleEvent">{event.record.fields.title}</p>
              <div>{event.record.fields.lead_text}</div>
              <span>
                {new Date(event.record.fields.date_start).toLocaleDateString()} -{" "}
                {new Date(event.record.fields.date_end).toLocaleDateString()}
              </span>

              <button onClick={() => addToFavoriteList(event.record)} className="btnheart"><FaHeart /></button>
              <button onClick={() => removeToFavoriteList(event.record.id)} >supprimer</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LastEvents;
