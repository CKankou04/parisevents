import React, { useState, useEffect } from "react";

export const Favoris = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('myfav')) || [];
        setFavorites(favorites)
      }, []);

    return (
        <div>
            {favorites.map((favorite, index) => (
                <div key={index}>
                    <span>{favorite.id}</span>
                    <span>{favorite.fields.lead_text}</span>

                </div>
            ))}
        </div>
    );
}

export default Favoris
