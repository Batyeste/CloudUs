import axios from "axios";

const linkAPI = process.env.REACT_APP_LinkAPI;

// Envoie du code
export const registerCode = async (email) => {
    // console.log('data', data);
    // console.log('linkAPI', linkAPI);
    try {
        const response = await axios.post(`${linkAPI}/code_verif`, email, {
        });

        return response.data;
    } catch (error) {
        return { error: error.response ? error.response.data : error.message };
    }
};