import { bgBG } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";

// Définition des couleurs primaires mises à jour
const primaryColors = {
  100: "#fff9e1", // Très clair (plus pâle que la couleur de base)
  200: "#ffe8b3", // Clair
  300: "#ffd58e", // Moyen clair
  400: "#ffc459", // Légèrement plus intense mais encore claire
  500: "#ffd080", // Couleur de base (moyenne)
  600: "#e6b35c", // Légèrement plus foncée
  700: "#cc9b4f", // Plus foncée
  800: "#b48343", // Très foncée
  900: "#9a6a37", // Presque marron
};

const secondaryColors = {
  100: "#f7f7f7", // Très clair
  200: "#e0e0e0", // Clair
  300: "#c2c2c2", // Moyen clair
  400: "#a3a3a3", // Moyen
  500: "#1e1e1e", // Couleur principale secondaire (gris très foncé)
  600: "#191919", // Gris très sombre
  700: "#141414", // Plus sombre
  800: "#0e0e0e", // Très sombre
  900: "#070707", // Presque noir
};

const tertiaryColor = "#d3d4dd";

const theme = createTheme({
  palette: {
    primary: primaryColors,
    background: {
      default: secondaryColors[500],
      secondary: secondaryColors[600],
      paper: "#ffbe59",
    },
    text: {
      primary: primaryColors[500],
      secondary: secondaryColors[500],
      tertiary: tertiaryColor,
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.2rem",
      fontWeight: 700,
      color: primaryColors[500],
      textShadow: `0 0 2px`,
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 600,
      color: primaryColors[500],
      textShadow: `0 0 2px`,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: primaryColors[500],
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      color: tertiaryColor,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "5px",
          textTransform: "none",
          fontSize: "18px",
          fontWeight: "bold",
          transition: "0.2s ease-out, 0.2s ease-in",
        },
        // Bouton primaire
        primaryButton: {
          color: secondaryColors[500], // Texte en couleur secondaire
          backgroundColor: primaryColors[500], // Fond primaire
          border: `1px solid ${primaryColors[500]}`,
          transition: "0.3s ease-in-out",

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
          transition: "0.3s ease-in-out",

          "&:hover": {
            backgroundColor: secondaryColors[500],
            color: primaryColors[500],
            border: `1px solid ${primaryColors[500]}`,
            boxShadow: `0 0 10px inset ${primaryColors[500]}`,
          },
        },

        linkButton: {
          fontSize: "15px",
          color: tertiaryColor,
          textDecoration: "none",
          padding: "5px",
          position: "relative",

          "&:hover": {
            color: primaryColors[500],
          },

          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "0%",
            height: "2px",
            backgroundColor: primaryColors[500],
            transition: "width 0.2s ease-in-out",
          },

          "&:hover::after": {
            width: "100%",
          },
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: primaryColors[500], // Couleur du texte dans les éléments du menu
          backgroundColor: secondaryColors[500], // Couleur de fond des éléments du menu
        },
      },
    },

    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: secondaryColors[500], // Fond de la liste du menu
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: primaryColors[500],
          transition: "color 0.3s ease-in-out",
          "&:hover": {
            color: primaryColors[600],
          },
          "&:active": {
            color: primaryColors[700],
          },
          "&:visited": {
            color: primaryColors[400],
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            color: tertiaryColor,

            "&.Mui-focused fieldset": {
              boxShadow: `0 2px 5px  ${primaryColors[500]}`,
            },
          },
          "& .MuiInputBase-input": {
            color: tertiaryColor,
          },
          "& .MuiInputLabel-root": {
            color: tertiaryColor,
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: primaryColors[500],
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: secondaryColors[500],
          color: primaryColors[500],
        },
        indicator: {
          backgroundColor: primaryColors[500],
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: secondaryColors[500],
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          color: "#b0b3c5",
          "&.Mui-selected": {
            color: primaryColors[500],
          },
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          color: tertiaryColor,
          backgroundColor: secondaryColors[500],
          padding: "5px 0px",
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #ffd389",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: secondaryColors[500],
            color: primaryColors[500],
            fontWeight: "bold",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: secondaryColors[500],
            color: tertiaryColor,
          },
        },
      },
    },
  },
});

export default theme;
