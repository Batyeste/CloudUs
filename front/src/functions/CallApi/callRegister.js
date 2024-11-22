import axios from 'axios';

const linkAPI = process.env.REACT_APP_LinkAPI;

export const submitRegistration = async (data) => {
    const postData = {
        username: data.email, 
        password: data.password,
        nom: data.nom,
        prenom: data.prenom,
        adresse: data.adressePostale 
    };

    // console.log('postData', postData);
    // console.log('linkAPI', linkAPI);

    try {
        const response = await axios.post(`${linkAPI}/register`, postData);

        return { success: true, data: response.data };
    } catch (error) {
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, error: { api: 'erreur lors de la connexion API' } };
        }
    }
};