import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Input,
  CircularProgress,
} from "@mui/material";
import { uploadFile } from "../../functions/FileApi/uploadFiles";

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
    setUploadStatus("Téléchargement en cours...");
    const result = await uploadFile(file);
    if (result.error) {
      setUploadStatus(`Erreur lors de l'upload : ${result.error}`);
    } else {
      setUploadStatus(`Fichier uploadé avec succès : ${result.file}`);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <Box sx={{ width: "100%", textAlign: "center", padding: 2 }}>
      <Typography variant="h1" gutterBottom sx={{ pt: 5, mb: 5 }}>
        Envoyer des fichiers
      </Typography>

      {/* Zone de dépôt de fichier */}
      <Box
        sx={{
          border: "2px dashed #1976d2",
          padding: 3,
          borderRadius: 1,
          cursor: "pointer",
          backgroundColor: isDragging ? "#e3f2fd" : "#f5f5f5",
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <Typography variant="body1">
            Fichier sélectionné : {file.name}
          </Typography>
        ) : (
          <Typography variant="body1">
            Glissez un fichier ici ou cliquez pour en sélectionner un
          </Typography>
        )}
      </Box>

      {/* Input invisible pour sélectionner un fichier */}
      <Input
        type="file"
        onChange={handleFileChange}
        sx={{ display: "none" }}
        inputProps={{ accept: "image/*" }}
        id="fileInput"
      />

      {/* Bouton pour sélectionner un fichier */}
      <label htmlFor="fileInput">
        <Button variant="contained" sx={{ marginTop: 2 }} component="span">
          Sélectionner un fichier
        </Button>
      </label>

      {/* Affichage du bouton d'envoi et du statut de téléchargement */}
      {file && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          sx={{ marginTop: 2 }}
        >
          Envoyer le fichier
        </Button>
      )}

      {/* Affichage du statut de téléchargement */}
      {uploadStatus && (
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          {uploadStatus}
        </Typography>
      )}
    </Box>
  );
}
