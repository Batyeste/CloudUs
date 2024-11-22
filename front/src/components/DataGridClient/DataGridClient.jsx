import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getClients } from "../../services/ServiceApi"; // Importe la fonction pour récupérer les clients

function DataGridClient() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les clients dès que le composant est monté
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error("Erreur de récupération des clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "email", headerName: "Email", width: 220 },
    {
      field: "usedStorage",
      headerName: "Stockage utilisé (Go)",
      width: 220,
    },
    {
      field: "totalStorage",
      headerName: "Stockage total (Go)",
      width: 220,
    },
    {
      field: "availableStorage",
      headerName: "Stockage disponible (Go)",
      width: 220,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        const clientId = params.row.id;

        return (
          <Link
            to={`/client-details/${clientId}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="primary">
              Voir Détails
            </Button>
          </Link>
        );
      },
    },
  ];

  // Transformer les données pour correspondre aux colonnes du DataGrid
  const rows = clients.map((client) => ({
    id: client.id, // Utilise l'ID unique fourni par l'API
    email: client.email,
    usedStorage: client.usedStorage
      ? `${(client.usedStorage / 1024 / 1024 / 1024).toFixed(2)} Go`
      : "N/A",
    totalStorage: client.totalStorage
      ? `${(client.totalStorage / 1024 / 1024 / 1024).toFixed(2)} Go`
      : "N/A",
    availableStorage: client.availableStorage
      ? `${(client.availableStorage / 1024 / 1024 / 1024).toFixed(2)} Go`
      : "N/A",
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      )}
    </div>
  );
}

export default DataGridClient;
