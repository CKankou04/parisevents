import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import parse from "html-react-parser";
import "../css/DetailEvents.css";
import { FaFacebook, FaTwitter, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export const DetailEvents = () => {
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

  console.log(data);

  return (
    <>
      {data && (
        <div className="containerDetail">
          <p className="title">{data.record.fields.title} </p>
          <hr/>
          <div className="Details">
            <div className="leftbox">
              <figure className="imageCover">
                <figcaption>
                  <img src={data.record.fields.cover_url} alt="img event" width="80%" height="auto" />
                </figcaption>
              </figure>
              <div className="description">
                {parse(data.record.fields.description)}
              </div>
              <button><Link to="/" className="retour"> Retour </Link> </button>
            </div>
            <div className="rightbox">
              <button onClick={() => addToFavoriteList(data.record)} className="btnSauvegarde" > sauvegarder</button>
              <div className="containerdate">
                <p className="date">Dates:</p>
                <p className="date_decription"> {parse(data.record.fields.date_description)}</p>
              </div>
              <div className="containerprice">
                <p className="price">Prix:</p>
                <p className="price_detail"> {data.record.fields.price_detail}</p>
              </div>
              <div className="containeradress">
                <p className="adress">S'y rendre:</p>
                <span className="contactname">{data.record.fields.contact_name}</span> -
                <span>
                 <span className="address_street">{data.record.fields.address_street}</span>,
                 <span className="codepostal">{data.record.fields.address_zipcode}</span>
                  <span className="address_city"> {data.record.fields.address_city}</span>


                </span>
              </div>

              <div className="containertransport">
                <p className="transport">En transport</p>
                <p className="">{data.record.fields.transport}</p>
              </div>

              <div className="containercontact">
                <p className="contact">Plus D'infos</p>
                <p className="telephone"> <FaPhoneAlt /> {data.record.fields.contact_phone}</p>
                <p className="mail"><FaEnvelope /> {data.record.fields.contact_mail}</p>
                <p className="facebook"><FaFacebook /> {data.record.fields.contact_facebook}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailEvents;
