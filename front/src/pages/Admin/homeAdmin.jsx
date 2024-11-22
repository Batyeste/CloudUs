import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import InfosClients from "./InfosClient/InfosClients";
import InfosDetails from "./InfosDetails/InfosDetails";
import Dashboard from "./Stats/Dashboard";
import theme from "../../components/theme/theme";

function HomeAdmin() {
  const [value, setValue] = React.useState(0);

  // Gère le changement de tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, padding: 3 }}>
      <main style={{ flexGrow: 1, padding: "16px" }}>
        <Typography variant="h1">Accueil Admin</Typography>

        {/* Tabs */}
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            padding: 3,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Navigation des pages"
            sx={{ marginBottom: 3 }}
          >
            <Tab label="Admin" />
            <Tab label="Dashboard" />
          </Tabs>
          {/* Contenu des pages */}
          {value === 0 && <InfosClients />} {/* Page Admin */}
          {value === 1 && <Dashboard />} {/* Page Dashboard */}
        </Box>
      </main>
    </Box>
  );
}

export default HomeAdmin;
