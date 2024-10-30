import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import './PricingCard.css'

const PricingCard = ({ title, price, storage,  raison1, raison2, onClick }) => {
  return (
    <div className="card">
      <p className="title">{title}</p>
      <div className="pricecontainer">
        <p className="price">{price}€</p>
        <p className="pricedescriptor">/mois</p>
      </div>
      <p className="includes">Ce plan inclut :</p>
      <ul className="benefitlist">
        <li>
          <FontAwesomeIcon icon={faCloud} className="cloud-icon" />
          {storage} Go de stockage
        </li>
        <li>{raison1}</li>
        <li>{raison2}</li>
      </ul>
      <div className="btncontainer">
        <button className="select-button" onClick={onClick}>
          Choisir
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
