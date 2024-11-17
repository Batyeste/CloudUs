// theme.jsx
import { createTheme } from '@mui/material/styles';

// Définir votre palette de couleurs personnalisée
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Bleu principal
    },
    secondary: {
      main: '#dc004e', // Rouge secondaire
    },
    background: {
      default: '#f5f5f5', // Fond par défaut
      paper: '#ffffff', // Fond des éléments comme Paper
    },
    text: {
      primary: '#333333', // Couleur principale du texte
      secondary: '#888888', // Couleur secondaire du texte
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Police principale
    h1: {
      fontSize: '2.2rem', // Taille du titre h1
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    // Personnalisation des composants MUI si nécessaire
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Coins arrondis pour les boutons
          padding: '10px 20px', // Espacement interne
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Ombre légère
        },
      },
    },
  },
});

export default theme;
