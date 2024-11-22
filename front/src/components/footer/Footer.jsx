import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "../theme/theme";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: theme.palette.background.default,
        textAlign: "center",
        padding: "20px 0",
        zIndex: 1000,
        boxShadow: "0 0 10px #ffd080",
      }}
    >
      <Box
        className="container"
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <Typography variant="body2" sx={{ color: theme.palette.text.tertiary }}>
          &copy; 2024 CloudUs. Tout droits réservé.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
