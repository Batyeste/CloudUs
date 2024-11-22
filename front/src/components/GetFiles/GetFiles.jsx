import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { useFiles } from "../../functions/FileApi/useFiles";
import { deleteFiles } from "../../functions/FileApi/deleteFiles";
import ImageCard from "../ImageCard/ImageCard";
import theme from "../theme/theme";

const GetFiles = () => {
  const { files, error, isLoading } = useFiles();
  const [tabIndex, setTabIndex] = useState(0);

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

  const handleDownload = (filePath, fileName) => {
    try {
      // Construire l'URL complète en fonction du chemin du fichier
      const downloadUrl = `/uploads/${filePath}`;

      // Créer un lien de téléchargement dynamique
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName; // Nom du fichier téléchargé
      link.click(); // Simuler un clic pour déclencher le téléchargement
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
    }
  };

  // Définir les extensions pour images et autres fichiers
  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "txt",
    "odt",
    "ods",
    "odp",
    "rtf",
    "csv",
    "zip",
    "rar",
    "7z",
  ];

  // Filtrer les fichiers par type
  const imageFiles = files?.filter((file) =>
    imageExtensions.includes(file.format.toLowerCase())
  );
  const otherFiles = files?.filter((file) =>
    documentExtensions.includes(file.format.toLowerCase())
  );

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">Erreur : {error}</Typography>
      </Box>
    );

  if (!files || files.length === 0)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography>Aucun fichier trouvé</Typography>
      </Box>
    );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h2" gutterBottom>
        Mes Fichiers
      </Typography>

      <Divider sx={{ bgcolor: theme.palette.text.tertiary, mb: 2 }} />

      {/* Onglets pour basculer entre les sections */}
      <Tabs
        value={tabIndex}
        onChange={(e, newIndex) => setTabIndex(newIndex)}
        aria-label="Onglets des fichiers"
      >
        <Tab label="Fichiers" />
        <Tab label="Images" />
      </Tabs>

      {/* Contenu des onglets */}
      <Box sx={{ marginTop: 3 }}>
        {tabIndex === 0 && (
          <List
            sx={{
              minWidth: "90vw",
              maxWidth: "90vw",
              bgcolor: theme.palette.background.default,
            }}
          >
            {otherFiles.map((file) => (
              <ListItem
                sx={{ color: theme.palette.text.tertiary }}
                key={file.id}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="download"
                      onClick={() => handleDownload(file.url, file.name)} // Passer le chemin et le nom du fichier
                      sx={{ color: "green" }} // Couleur bleue pour la télécharger
                    >
                      <DownloadIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(file.id)}
                      sx={{ color: "red" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={file.name}
                  secondary={`Type : ${file.format.toUpperCase()}`}
                />
              </ListItem>
            ))}
          </List>
        )}
        {tabIndex === 1 && (
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            sx={{ minWidth: "90vw", maxWidth: "90vw" }}
          >
            {imageFiles.map((image) => (
              <ImageCard key={image.id} file={image} onDelete={handleDelete} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GetFiles;
