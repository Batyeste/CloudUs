import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { getToken } from "../../utils/auth";
import theme from "../theme/theme";

const Header = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Décoder le token et récupérer les informations utilisateur
  useEffect(() => {
    const storedToken = getToken();
    setToken(storedToken);

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser(decoded);
        console.log("Token décodé :", decoded);
        console.log(user);
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
      }
    }
  }, []);

  // Gestion de l'ouverture/fermeture du menu utilisateur
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Déconnexion utilisateur
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.background.secondary,
      }}
    >
      <Toolbar sx={{ boxShadow: "0 0 10px #ffd080" }}>
        {/* Logo et lien vers la page d'accueil */}
        <Typography
          variant="h6"
          component={Link}
          to="/accueil"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          <Box display="flex" alignItems="center">
            <img
              src="/img/logo2.png"
              alt="CloudUs Logo"
              style={{ height: 40, marginRight: 10 }}
            />
            <Typography variant="h2">CloudUs</Typography>
          </Box>
        </Typography>

        {/* Liens de navigation centrés */}
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            gap: 2,
            mr: 20,
          }}
        >
          <Button
            component={Link}
            to="/why-us"
            color="inherit"
            sx={{
              ...theme.components.MuiButton.styleOverrides.linkButton,
            }}
          >
            Pourquoi nous choisir ?
          </Button>
          <Button
            component={Link}
            to="/contact"
            color="inherit"
            sx={{
              ...theme.components.MuiButton.styleOverrides.linkButton,
            }}
          >
            Contact
          </Button>

          {/* Les nouveaux liens ajoutés */}
          {token && (
            <>
              <Button
                component={Link}
                to="/drive"
                color="inherit"
                sx={{
                  ...theme.components.MuiButton.styleOverrides.linkButton,
                }}
              >
                Votre Drive
              </Button>
              <Button
                component={Link}
                to="/add-stockage"
                color="inherit"
                sx={{
                  ...theme.components.MuiButton.styleOverrides.linkButton,
                }}
              >
                Ajouter du stockage
              </Button>
            </>
          )}
        </Box>

        {/* Bouton inscription ou menu utilisateur */}
        {!token ? (
          <Button
            component={Link}
            to="/signup"
            color="secondary"
            variant="contained"
            sx={{
              ...theme.components.MuiButton.styleOverrides.primaryButton,
              ml: 2,
            }}
          >
            S'inscrire
          </Button>
        ) : (
          <>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ marginLeft: 2, color: theme.palette.text.primary }}
            >
              <AccountCircleIcon />
              <Typography
                variant="body1"
                sx={{ marginLeft: 1, color: theme.palette.text.tertiary }}
              >{`${user?.prenom} ${user?.nom}`}</Typography>
            </IconButton>

            {/* Menu utilisateur */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                component={Link}
                to="/settings"
                onClick={handleMenuClose}
              >
                <SettingsIcon sx={{ marginRight: 1 }} />
                Paramètres
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ marginRight: 1 }} />
                Se déconnecter
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
