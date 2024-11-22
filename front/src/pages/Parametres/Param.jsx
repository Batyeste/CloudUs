import React, { useState, useEffect } from "react";
import { getAuthToken } from "../../functions/tokenAuth/authToken"; // Assurez-vous d'avoir la fonction qui récupère le token
import { jwtDecode } from "jwt-decode";
import axios from "axios"; // Vous pouvez utiliser axios pour l'appel API
import { Box, Typography, Button, Alert } from "@mui/material"; // Importation des composants MUI
import theme from "../../components/theme/theme";
import { useNavigate } from "react-router-dom"; // Pour la redirection

function Param() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook pour la redirection

  // Utilisation du useEffect pour décoder le token à la première montée du composant
  useEffect(() => {
    const token = getAuthToken(); // Récupère le token
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Décode le token
        setUserInfo(decodedToken); // Stocke les informations de l'utilisateur
      } catch (err) {
        setError("Erreur lors du décodage du token.");
      }
    } else {
      setError("Token introuvable.");
    }
  }, []);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
    );

    if (!confirmDelete) {
      return; // Si l'utilisateur annule, on ne fait rien
    }

    try {
      const token = getAuthToken(); // Récupère le token
      if (!token) {
        setError("Vous devez être connecté pour supprimer votre compte.");
        return;
      }

      const response = await axios.delete(
        "http://localhost:8000/api/user/delete-account",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Redirige vers la page de login après la suppression du compte
        alert("Votre compte a été supprimé.");
        navigate("/login"); // Redirection vers /login
      } else {
        setError(
          "Une erreur est survenue lors de la suppression de votre compte."
        );
      }
    } catch (err) {
      setError("Erreur lors de la suppression du compte.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "84vh",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
        }}
      >
        <Typography variant="h1" gutterBottom sx={{ pt: 5, mb: 5 }}>
          Paramètres de votre compte
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {userInfo ? (
          <Box sx={{ marginBottom: 2, width: "100%" }}>
            <Typography
              sx={{ color: theme.palette.text.primary }}
              variant="body1"
            >
              <strong>Nom:</strong>
            </Typography>{" "}
            <Typography sx={{ color: theme.palette.text.tertiary }}>
              {userInfo.nom}
            </Typography>
            <Typography
              sx={{ color: theme.palette.text.primary }}
              variant="body1"
            >
              <strong>Prénom:</strong>
            </Typography>{" "}
            <Typography sx={{ color: theme.palette.text.tertiary }}>
              {userInfo.prenom}
            </Typography>
            <Typography
              sx={{ color: theme.palette.text.primary }}
              variant="body1"
            >
              <strong>Email:</strong>
            </Typography>{" "}
            <Typography sx={{ color: theme.palette.text.tertiary }}>
              {userInfo.username}
            </Typography>
            <Typography
              sx={{ color: theme.palette.text.primary }}
              variant="body1"
            >
              <strong>Adresse:</strong>
            </Typography>{" "}
            <Typography sx={{ color: theme.palette.text.tertiary }}>
              {userInfo.adresse}
            </Typography>
            {/* Affichez d'autres informations récupérées du token ici */}
          </Box>
        ) : (
          <Typography variant="body1">
            Chargement des informations...
          </Typography>
        )}

        <Button
          onClick={handleDeleteAccount}
          color="error"
          sx={{
            padding: "10px",
            marginTop: 3,
            ...theme.components.MuiButton.styleOverrides.primaryButton,
          }}
        >
          Supprimer mon compte
        </Button>
      </Box>
    </Box>
  );
}

export default Param;
