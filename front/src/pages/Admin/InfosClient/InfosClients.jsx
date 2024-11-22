import React from "react";
import DataGridClient from "../../../components/DataGridClient/DataGridClient";
import { Box, Typography } from "@mui/material";

function InfosClients() {
  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 2 }}>
        Informations des clients
      </Typography>
      <DataGridClient clients />
    </Box>
  );
}

export default InfosClients;
