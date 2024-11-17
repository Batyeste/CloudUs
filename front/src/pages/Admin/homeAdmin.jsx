import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import InfosClients from './InfosClient/InfosClients';
import InfosDetails from './InfosDetails/InfosDetails';
import Dashboard from './Stats/Dashboard';

function HomeAdmin() {
  const [value, setValue] = React.useState(0);

  // Gère le changement de tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: 'flex' }}>
      <main style={{ flexGrow: 1, padding: '16px' }}>
        <h1>Accueil Admin</h1>

        {/* Tabs */}
        <Box>
          <Tabs value={value} onChange={handleChange} aria-label="Navigation des pages">
            <Tab label="Admin" />
            <Tab label="Dashboard" />
          </Tabs>

          {/* Contenu des pages */}
          {value === 0 && <InfosClients />}  {/* Page Admin */}
          {value === 1 && <Dashboard />}  {/* Page Dashboard */}
        </Box>
      </main>
    </div>
  );
}

export default HomeAdmin;
