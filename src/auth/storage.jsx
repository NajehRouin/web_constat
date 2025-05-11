const key = "token";

const storeToken = async (authToken) => {
  try {
    window.localStorage.setItem(key, authToken);
    console.log("Token stored successfully");
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
    const token = window.localStorage.getItem(key);
    if (!token) {
      console.log("Aucun token trouvé");
      return null;
    }
    return token;
  } catch (error) {
    console.log("Erreur de récupération:", error);
    return null;
  }
};

const removeToken = async () => {
  try {
    window.localStorage.removeItem(key);
    console.log("Token removed successfully");
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};




export default {
  storeToken,
  getToken,
  removeToken,
  
};