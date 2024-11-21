import React, { useState, useEffect } from "react";
import PricingCard from "../CardPrice/PricingCard";
import PaiementMethod from "../PaiementMethod/PaiementMethod";
import FacturePDF from "../FacturePDF";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../functions/tokenAuth/authToken";
import { buyStorage } from "../../functions/StorageApi/BuyStorage";
import { jwtDecode } from "jwt-decode";

import "./AddStockage.css";

export default function AddStockage() {
  const [error, setError] = useState("");
  const [showPaiementMethod, setShowPaiementMethod] = useState(false);
  const [showFacturePDF, setShowFacturePDF] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    nomSoce: "none",
    adressePostaleSoce: "none",
    siret: "none",
    tel: "none",
    prénom: "",
    nom: "",
    email: "",
    adressePostale: "",
    prix: "",
    stockage: "",
    tituleCB: "",
    paymentMethod: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const token = getAuthToken();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setFormData((prevFormData) => ({
          ...prevFormData,
          prénom: decodedToken.prenom || "",
          nom: decodedToken.nom || "",
          email: decodedToken.username || "",
          adressePostale: decodedToken.adresse || "",
        }));
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
        setError("Token invalide ou expiré.");
      }
    }
  }, [token]);

  const navigate = useNavigate();

  const formule1 = { prix: '20', stockage: '20', raison1: 'Support standard', raison2: '2Go de transfert'};
  const formule2 = { prix: '50', stockage: '50', raison1: 'Support prioritaire', raison2: '10Go de transfert'};
  const formule3 = { prix: '100', stockage: '100', raison1: 'Support 7/7', raison2: '50Go de transfert'};

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber" && value.length <= 16 && /^\d*$/.test(value)) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === "cvv" && value.length <= 4 && /^\d*$/.test(value)) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name !== "cardNumber" && name !== "cvv") {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCardClick = (prix, stockage) => {
    setFormData({
      ...formData,
      prix,
      stockage,
    });
    setShowPaiementMethod(true);
  };

  const handlePaiementSubmit = async () => {
    const response = getAuthToken();
    if (response) {
      setShowFacturePDF(true);
    } else {
      setError(
        response.data.error || "Une erreur est survenue lors du paiement."
      );
    }
  };

  const handleSendToPDF = async () => {
    const isFormComplete = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    if (!isFormComplete) {
      setError(
        "Veuillez remplir toutes les informations de paiement avant de continuer."
      );
      return;
    }

    const response = await buyStorage({
      stockage: formData.stockage,
    });

    if (response.error) {
      setError(
        response.error.message || "Une erreur est survenue lors de l'achat."
      );
    } else {
      setShowPopup(true);
    }
  };

  return (
    <div className="stockage-cards">
      {showFacturePDF ? (
        <FacturePDF formData={formData} />
      ) : showPaiementMethod ? (
        <>
          <PaiementMethod
            formData={formData}
            handleChange={handleChange}
            error={error}
            handlePaiementSubmit={handlePaiementSubmit}
          />
          <button className="send-to-pdf-btn" onClick={handleSendToPDF}>
            Confirmer le paiement
          </button>
        </>
      ) : (
        <>
          <div className="cards">
            <PricingCard
              title="Standard"
              price={formule1.prix}
              storage={formule1.stockage}
              raison1={formule1.raison1}
              raison2={formule1.raison2}
              onClick={() => handleCardClick(formule1.prix, formule1.stockage)}
            />
            <PricingCard
              title="Premium"
              price={formule2.prix}
              storage={formule2.stockage}
              raison1={formule2.raison1}
              raison2={formule2.raison2}
              onClick={() => handleCardClick(formule2.prix, formule2.stockage)}
            />
            <PricingCard
              title="Pro"
              price={formule3.prix}
              storage={formule3.stockage}
              raison1={formule3.raison1}
              raison2={formule3.raison2}
              onClick={() => handleCardClick(formule3.prix, formule3.stockage)}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
        </>
      )}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Vos {formData.stockage} Go ont bien été ajoutés !</p>
            <button
              onClick={() => navigate("/pdf", { state: { formData } })}
              className="popup-button"
            >
              Cliquez ici pour accéder à votre facture
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
