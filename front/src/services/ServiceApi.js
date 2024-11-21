import axios from 'axios';

// Base URL de l'API
const BASE_URL = 'http://127.0.0.1:8000/api';

// Créer une instance Axios
const api = axios.create({
  baseURL: BASE_URL,
});

// Ajouter le token directement dans les en-têtes des requêtes
api.interceptors.request.use((config) => {
  // Récupérer le token depuis le localStorage
  const token = localStorage.getItem('token');  // Ou sessionStorage.getItem('token') si tu l'as stocké dans sessionStorage
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Fonction pour récupérer les statistiques du tableau de bord
export const getDashboardData = async () => {
  try {
    const response = await api.get('/admin/dashboard');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données du tableau de bord:', error);
    throw error;
  }
};

// Fonction pour récupérer les clients
export const getClients = async () => {
  try {
    const response = await api.get('/admin/clients');
    return response.data;  // Retourne la liste des clients
  } catch (error) {
    console.error('Erreur lors de la récupération des clients:', error);
    throw error;
  }
};

export const getFilesByUserId = async (clientId) => {
  try {
    console.log("clientID api : ", clientId)
    if (!clientId) {
      throw new Error('L\'ID du client est requis');
    }
    
    const response = await api.get(`/admin/files?userId=${clientId}`);
    return response.data;  // Retourne les fichiers associés à l'ID client
  } catch (error) {
    console.error('Erreur lors de la récupération des fichiers:', error);
    throw error;  // Propager l'erreur pour gestion dans le composant
  }
};