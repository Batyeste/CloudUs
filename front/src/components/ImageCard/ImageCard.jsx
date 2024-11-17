import React, { useState } from "react";
import "./ImageCard.css";

const ImageCard = ({ file, onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  // |cors a changer pour dl| 
  // renvoie sur le lien
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.imageUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="image-card">
        <div className="image-container">
          <img
            src={file.imageUrl}
            alt={file.name}
            className="image"
          />
        </div>
        <p className="file-name">{file.name}</p>
        
        <div className="button-container">
          <button
            className="icon-button download-button" onClick={handleDownload} title="Télécharger" >
            ↓
          </button>
          <button
            className="icon-button delete-button" onClick={() => setShowConfirmation(true)} title="Supprimer">
            ×
          </button>
        </div>
      </div>

      <div className={`confirmation-modal ${showConfirmation ? 'show' : ''}`}>
        <div className="modal-content">
          <h3 className="modal-title">Confirmer la suppression</h3>
          <p>Êtes-vous sûr de vouloir supprimer {file.name} ?</p>
          <div className="modal-buttons">
            <button className="cancel-button" onClick={() => setShowConfirmation(false)} >
              Annuler
            </button>
            <button className="confirm-button" onClick={() => { 
                onDelete(file.id); setShowConfirmation(false); }} >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCard;