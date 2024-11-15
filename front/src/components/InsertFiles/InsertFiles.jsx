import React, { useState } from "react";
import { uploadFile } from "../../functions/FileApi/uploadFiles";
import "./InsertFiles.css"; 

export default function InsertFiles() {

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Aucun fichier sélectionné");
      return;
    }
    const result = await uploadFile(file);
    if (result.error) {
      const errorMessage = result.error.message || JSON.stringify(result.error);
      setUploadStatus(`Erreur | ${errorMessage}`);
    } else {
      setUploadStatus(`Fichier uploadé avec succès : ${result.file}`);
    }
  };

  return (
    <div className="insert-files">
        <h1>Envoyer des fichiers</h1>
      <div
        className={`drop-zone ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <p>Fichier sélectionné : {file.name}</p>
        ) : (
          <p>Glissez un fichier ici ou cliquez pour en sélectionner un</p>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="file-upload-button">
          Sélectionner un fichier
        </label>
      </div>
      {file && (
        <button onClick={handleUpload} className="upload-button">
          Envoyer le fichier
        </button>
      )}
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};
