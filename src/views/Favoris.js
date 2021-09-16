import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import "../css/Favoris.css";

export const Favoris = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("myfav")) || [];
    setFavorites(favorites);
    return removeToFavoriteList();
  }
  , []);

  const removeToFavoriteList = (id) => {

    let myfav = JSON.parse(localStorage.getItem("myfav")) || [];
    const removeArr = myfav.filter((element) => element.id !== id);
    localStorage.setItem("myfav", JSON.stringify(removeArr));
  };

  return (
    <div className="container">
      {favorites.map((favorite, index) => (
        <div key={index} className="containerInf">
          <figure className="imageEvents">
            <figcaption className="imageEvents">
              <img
                src={favorite.fields.cover_url}
                alt="imcover"
                width="90%"
                height="auto"
              />
            </figcaption>
          </figure>

          <div className="favbox">
                <p className="title">{favorite.fields.title}</p>
                <div className="date">
                {new Date(favorite.fields.date_start).toLocaleDateString()}{" "}
                </div>
                <div className="description">{favorite.fields.lead_text}</div>
             <div className="buttons">
                <button
                    onClick={() => removeToFavoriteList(favorite.id)}
                    className="btnfav">
                    <FaTrash />
                </button>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favoris;
