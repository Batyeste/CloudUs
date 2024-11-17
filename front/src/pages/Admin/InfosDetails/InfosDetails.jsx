import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Tabs, Tab } from '@mui/material';
import FileSection from './FileSection';  // Composant pour afficher les fichiers
import ImageSection from './ImageSection';  // Composant pour afficher les images
import { getFilesByUserId } from '../../../services/ServiceApi';  // Fonction pour récupérer les fichiers

function InfosDetails() {
  const { clientId } = useParams();  // Récupérer l'ID du client depuis l'URL
  const [files, setFiles] = useState([]);  // État pour stocker les fichiers
  const [loading, setLoading] = useState(true);  // État pour gérer le chargement
  const [tabIndex, setTabIndex] = useState(0);  // État pour l'onglet sélectionné

  // Charger les fichiers dès que le composant est monté
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // Récupérer les fichiers via l'API
        const clientFiles = await getFilesByUserId(parseInt(clientId, 10));
        console.log('Fichiers récupérés:', clientFiles);  // Vérification de la structure des fichiers

        // Filtrer les fichiers en fonction de userId
        const filteredFiles = clientFiles.filter(file => file.user && file.user.userId === parseInt(clientId, 10));
        setFiles(filteredFiles);  // Mettre à jour les fichiers dans l'état
      } catch (error) {
        console.error('Erreur lors de la récupération des fichiers:', error);
      } finally {
        setLoading(false);  // Terminer le chargement
      }
    };

    fetchFiles();
  }, [clientId]);

  // Si les fichiers sont en cours de chargement, afficher un spinner
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Définir les extensions de documents et d'images
  const documentExtensions = [
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'odt', 'ods', 'odp', 'rtf', 'csv', 'zip', 'rar', '7z'
  ];

  // Séparer les fichiers d'images et les autres fichiers
  const imageFiles = files.filter(file => ['jpg', 'jpeg', 'png', 'gif'].includes(file.format.toLowerCase()));
  const otherFiles = files.filter(file => documentExtensions.includes(file.format.toLowerCase()));

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Détails des fichiers du client
      </Typography>

      {/* Onglets pour basculer entre Fichiers et Images */}
      <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} aria-label="Sections des fichiers">
        <Tab label="Fichiers" />
        <Tab label="Images" />
      </Tabs>

      {/* Afficher le contenu en fonction de l'onglet sélectionné */}
      {tabIndex === 0 && <FileSection files={otherFiles} />}
      {tabIndex === 1 && <ImageSection images={imageFiles} />}
    </Box>
  );
}

export default InfosDetails;
