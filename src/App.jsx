import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./auth/context";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false); // Ajout d'un état pour vérifier si l'app est chargée
console.log("isAuthenticated",isAuthenticated)
  useEffect(() => {
    // Attendre que le contexte soit chargé avant de naviguer
    setIsLoaded(true);
  }, [isAuthenticated]);

  if (!isLoaded) {
    return <div>Loading...</div>; // Afficher un écran de chargement si l'état n'est pas encore prêt
  }

  return (
    <Routes>
      <Route path="/dashboard/*" element={isAuthenticated==true ? <Dashboard /> : <Navigate to="/auth/sign-in" replace />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
