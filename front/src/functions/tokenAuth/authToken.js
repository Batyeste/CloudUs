export function getAuthToken() {
    console.log("Token récupéré");
    return localStorage.getItem("token");
  }
  