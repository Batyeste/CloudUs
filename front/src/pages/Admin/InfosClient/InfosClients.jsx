import React from 'react';
import DataGridClient from '../../../components/DataGridClient/DataGridClient';
import { Box } from '@mui/material';
import { Title } from '@mui/icons-material';



function InfosClients() {
  return (
    <Box>
      <h1>Informations des clients</h1>
      <DataGridClient clients />
    </Box>
  );
}

export default InfosClients;
