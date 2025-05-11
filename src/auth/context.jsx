import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    admin: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token récupéré depuis localStorage:", token); // Vérifier si le token existe
    if (token) {
      try {
        const admin = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Vérifier si le token est expiré
        console.log("currentTime ",currentTime )
        if (admin.exp < currentTime) {
          console.log("Le token a expiré");
          logOut(); // Si le token est expiré, déconnecter l'utilisateur
        } else {
          setAuthState({ token, admin, isAuthenticated: true });
        }
      } catch (error) {
        console.error("Token invalide:", error);
        logOut(); // Si le token est invalide, déconnecter l'utilisateur
      }
    } else {
      console.log("Aucun token trouvé dans localStorage.");
    }
  }, []);

  const logIn = (token) => {
    const admin = jwtDecode(token);
    localStorage.setItem("token", token);
    setAuthState({ token, admin, isAuthenticated: true });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setAuthState({ token: null, admin: null, isAuthenticated: false });
  };
  

  return (
    <AuthContext.Provider value={{ ...authState, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
