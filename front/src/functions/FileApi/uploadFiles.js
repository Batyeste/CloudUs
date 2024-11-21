import axios from "axios";
import { getAuthToken } from "../tokenAuth/authToken";

const linkAPI = process.env.REACT_APP_LinkAPI;

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const token = getAuthToken();
    if (token) {
        await axios.post(`${linkAPI}/files/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } else {
      console.error("Token manquant !");
      return { error: { message: "Token manquant" } };
    }
    
  } catch (error) {
    if (error.response) {
      console.log("API erreur | ", error.response.data);
      return { error: error.response.data };
    } else {
      console.log("Erreur | ", error.message);
      return { error: error.message };
    }
  }
};
