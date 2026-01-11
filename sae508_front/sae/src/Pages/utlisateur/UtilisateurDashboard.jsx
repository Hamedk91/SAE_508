import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Home from "./Home";
import Catalogue from "./Catalogue";
import MesFormations from "./MesFormations";
import Profil from "./Profil";
import Salle3D from "../Salle3d";
import "../../css/Dashboard.css";

export default function UtilisateurDashboard({ onLogout }) {
  const location = useLocation();

  // Fonction pour déterminer la vue actuelle depuis l'URL
  const getViewFromPath = () => {
    if (location.pathname.includes("mes-formations")) return "mes-formations";
    if (location.pathname.includes("catalogue")) return "catalogue";
    if (location.pathname.includes("profil")) return "profil";
    if (location.pathname.includes("salle-3d")) return "salle-3d"; // <-- Ajout pour salle 3D
    return "home";
  };

  const [view, setView] = useState(getViewFromPath());

  // Met à jour la vue lorsque l'URL change
  useEffect(() => {
    setView(getViewFromPath());
  }, [location]);

  return (
    <div className="dashboard-page">
      <Navbar onLogout={onLogout} />

      <div className="main-content">
        {view === "home" && <Home setView={setView} />}
        {view === "catalogue" && <Catalogue />}
        {view === "mes-formations" && <MesFormations />}
        {view === "profil" && <Profil />}
        {view === "salle-3d" && <Salle3D />} 
      </div>
    </div>
  );
}
