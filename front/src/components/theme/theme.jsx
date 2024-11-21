import { createTheme } from '@mui/material/styles';

// Définition des couleurs primaires mises à jour
const primaryColors = {
  100: '#fff9e1', // Très clair (plus pâle que la couleur de base)
  200: '#ffe8b3', // Clair
  300: '#ffd58e', // Moyen clair
  400: '#ffc459', // Légèrement plus intense mais encore claire
  500: '#ffd080', // Couleur de base (moyenne)
  600: '#e6b35c', // Légèrement plus foncée
  700: '#cc9b4f', // Plus foncée
  800: '#b48343', // Très foncée
  900: '#9a6a37', // Presque marron
};

const secondaryColors = {
  100: '#f7f7f7', // Très clair
  200: '#e0e0e0', // Clair
  300: '#c2c2c2', // Moyen clair
  400: '#a3a3a3', // Moyen
  500: '#1e1e1e', // Couleur principale secondaire (gris très foncé)
  600: '#191919', // Gris très sombre
  700: '#141414', // Plus sombre
  800: '#0e0e0e', // Très sombre
  900: '#070707', // Presque noir
};

const tertiaryColor = '#b0b3c5'

const theme = createTheme({
  palette: {
    primary: primaryColors,
    background: {
      default: secondaryColors[500],
      paper: '#ffbe59',
    },
    text: {
      primary: primaryColors[500],
      secondary: secondaryColors[500],
      tertiary: tertiaryColor,
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.2rem',
      fontWeight: 700,
      color: primaryColors[500],
      textShadow: `0 0 2px`,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: primaryColors[500],
      textShadow: `0 0 2px`,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: primaryColors[500],
      textShadow: `0 0 2px`,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '5px',
          textTransform: 'none',
          fontSize: "18px",
          fontWeight: "bold",
          transition: '0.2s ease-out, 0.2s ease-in',
        },
        // Bouton primaire
        primaryButton: {
          color: secondaryColors[500], // Texte en couleur secondaire
          backgroundColor: primaryColors[500], // Fond primaire
          border: `1px solid ${primaryColors[500]}`,
          transition: '0.3s',

          "&:hover": {
            backgroundColor: primaryColors[500],
            color: secondaryColors[500],
            border: `1px solid ${primaryColors[500]}`,
            boxShadow: `0 0 10px  ${primaryColors[500]}`,
          },
        },
        // Bouton secondaire
        secondaryButton: {
          color: primaryColors[500], 
          backgroundColor: secondaryColors[500], 
          border: `1px solid ${primaryColors[500]}`,
          transition: '0.3s',
          
          "&:hover": {
            backgroundColor: secondaryColors[500],
            color: primaryColors[500],
            border: `1px solid ${primaryColors[500]}`,
            boxShadow: `0 0 10px inset ${primaryColors[500]}`,
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            color: tertiaryColor,
              
            '&.Mui-focused fieldset': {
              boxShadow: `0 5px 5px  ${primaryColors[500]}`
            },
          },
          '& .MuiInputBase-input': {
            color: tertiaryColor,
          },
          '& .MuiInputLabel-root': {
            color: tertiaryColor,
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: primaryColors[500],
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: '#0d103e',
          color: primaryColors[500],
        },
        indicator: {
          backgroundColor: '#e7ac3c',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          color: '#b0b3c5',
          '&.Mui-selected': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: '1px solid #ffbe59',
          color: '#ffffff',
          backgroundColor: '#0d103e',
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #ffd389',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#ffbe59',
            color: '#0d103e',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#0d103e',
            color: '#ffffff',
          },
        },
      },
    },
  },
}
);

export default theme;
