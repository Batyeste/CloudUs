import React from "react";
import { useFiles } from "../../functions/FileApi/useFiles";
import { deleteFiles } from "../../functions/FileApi/deleteFiles";

import ImageCard from "../ImageCard/ImageCard";
import "./GetFiles.css";

const GetFiles = () => {
  const { files, error, isLoading } = useFiles();

  const handleDelete = async (fileId) => {
    try {
      await deleteFiles([fileId]);
      setTimeout(() => {
        window.location.reload(); 
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  if (isLoading) return (
    <div className="loading-container">
      <p>Chargement des fichiers...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <p>Erreur: {error}</p>
    </div>
  );

  if (!files || files.length === 0) return (
    <div className="empty-container">
      <p>Aucun fichier trouvé</p>
    </div>
  );

  return (
    <div className="files-container">
      <h2 className="files-title">Mes Fichiers</h2>
      <div className="files-grid">
        {files.map((file) => (
          <ImageCard
            key={file.id}
            file={file}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default GetFiles;
