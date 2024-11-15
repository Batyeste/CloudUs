import axios from "axios";
import { getAuthToken } from "../tokenAuth/authToken";

const linkAPI = process.env.REACT_APP_LinkAPI;

export const getFiles = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      console.error("Token manquant !");
      return { error: { message: "Token manquant" } };
    } else console.log("token:", token);
    console.log(` LINK API: ${linkAPI}/files/mesFichiers`);
    console.log("Authorization:", { Authorization: `Bearer ${token}` });

    const response = await axios.get(`${linkAPI}/files/mesFichiers`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error response:", error.response?.data || error.message);
    return { error: error.response?.data || error.message };
  }
};
