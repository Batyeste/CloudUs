import React from "react";
import "./PaiementMethod.css";

const PaiementMethod = ({ formData, handleChange, error }) => {
  return (
    <div className="grouped">
      <div className="form-group">
        <label htmlFor="tituleCB">Titulaire carte</label>
        <input
          type="text"
          id="tituleCB"
          name="tituleCB"
          value={formData.tituleCB}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="paymentMethod">Méthode de paiement</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option value="">Sélectionnez une méthode</option>
          <option value="creditCard">Carte de crédit</option>
          <option value="paypal">PayPal</option>
          <option value="bankTransfer">Virement bancaire</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="cardNumber">Numéro de carte</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          maxLength={16}
        />
      </div>

      <div className="form-group">
        <label>Date d'expiration</label>
        <div>
          <select
            id="expiryMonth"
            name="expiryMonth"
            value={formData.expiryMonth}
            onChange={handleChange}
          >
            <option value="">Mois</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1 < 10 ? `0${i + 1}` : i + 1}>
                {i + 1 < 10 ? `0${i + 1}` : i + 1}
              </option>
            ))}
          </select>

          <select
            id="expiryYear"
            name="expiryYear"
            value={formData.expiryYear}
            onChange={handleChange}
          >
            <option value="">Année</option>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={new Date().getFullYear() + i}>
                {new Date().getFullYear() + i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cvv">CVV</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          maxLength={4}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PaiementMethod;
