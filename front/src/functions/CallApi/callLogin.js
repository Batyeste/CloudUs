import axios from "axios";

const linkAPI = process.env.REACT_APP_LinkAPI;

// connexion de l'utilisateur
export const loginUser = async (data) => {
    // console.log('data', data);
    // console.log('linkAPI', linkAPI);
    try {
        const response = await axios.post(`${linkAPI}/login`, data, {
        });

        return response.data;
    } catch (error) {
        return { error: error.response ? error.response.data : error.message };
    }
};