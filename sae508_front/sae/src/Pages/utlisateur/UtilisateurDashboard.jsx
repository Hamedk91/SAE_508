import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Home from "./Home";
import Catalogue from "./Catalogue";
import MesFormations from "./MesFormations";
import Profil from "./Profil";
import "../../css/Dashboard.css";

export default function UtilisateurDashboard({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const getViewFromPath = () => {
    if (location.pathname.includes("mes-formations")) return "mes-formations";
    if (location.pathname.includes("catalogue")) return "catalogue";
    if (location.pathname.includes("profil")) return "profil";
    return "home";
  };

  const [view, setView] = useState(getViewFromPath());

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
      </div>
    </div>
  );
}
