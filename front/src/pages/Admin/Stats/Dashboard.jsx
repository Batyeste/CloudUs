import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDashboardData } from '../../../services/ServiceApi'; // Importer le service API

function Dashboard() {
  const [totalFiles, setTotalFiles] = useState(0);
  const [filesToday, setFilesToday] = useState(0);
  const [fileDistribution, setFileDistribution] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        
        // Mettre à jour les états avec les données de l'API
        setTotalFiles(data.totalFiles);
        setFilesToday(data.filesUploadedToday);

        // Répartition des fichiers par format
        const distribution = data.filesByFormat.map((item) => ({
          name: item.format,
          value: item.count,
        }));
        setFileDistribution(distribution);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du tableau de bord:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tableau de bord
      </Typography>

      <Grid container spacing={3}>
        {/* Nombre total de fichiers uploadés */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total de fichiers uploadés</Typography>
              <Typography variant="h4">{totalFiles}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Nombre de fichiers uploadés aujourd'hui */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Fichiers uploadés aujourd'hui</Typography>
              <Typography variant="h4">{filesToday}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Répartition des fichiers par format */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Répartition des fichiers par format</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={fileDistribution}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {fileDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffbb28', '#ff8042'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
