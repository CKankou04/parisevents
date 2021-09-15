import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';

export const ListEvents = () => {
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${id}`
    );
    const result = await data.json();
    setData(result);
  };

  console.log(data);

  return (
    <>
     {data && <div >
          <p className="title">{data.record.fields.title} </p>
          <div className="DetailAffich">
            <div id="blocgauche">
              <figure>
                <figcaption>
                  <img src={data.record.fields.cover_url} alt="img event" />
                </figcaption>
              </figure>
              <div className="lead_text">
              {parse(data.record.fields.description)}</div>
            </div>
            <div id="blocdroite">
              <button> sauvegarder</button>
              <span>
                <p>Dates:</p>
                <p className="date_decription">{data.record.fields.date_description}</p>
              </span>
              <span>
                <p>Prix:</p>
                <p className="price_detail">{data.record.fields.price_detail}</p>
              </span>
              <span>
                <p>S'y:</p>
                <p className="coordinates"></p>
                <p>
                  <span className="address_city"></span>
                  <span className="address_street"></span>
                </p>
              </span>

              <span>
                <p>En transport</p>
                <p className=""></p>
              </span>
            </div>
          </div>
        </div>}
    </>
  );
};

export default ListEvents;
