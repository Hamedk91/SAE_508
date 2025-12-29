import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminFormations from "./AdminFormations.jsx";
import AdminProfesseurs from "./AdminProfesseurs.jsx";
import AdminEleves from "./AdminEleves.jsx";
import "../../css/AdminDashboard.css";

export default function AdminDashboard({ onLogout }) {
  const navigate = useNavigate();
  const [view, setView] = useState("formations");

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-logo">TxL</div>
        
        <div className="admin-sidebar-menu">
          <button
            onClick={() => setView("formations")}
            className={`admin-sidebar-button ${view === "formations" ? "active" : ""}`}
          >
            📚 Formations
          </button>
          
          <button
            onClick={() => setView("professeurs")}
            className={`admin-sidebar-button ${view === "professeurs" ? "active" : ""}`}
          >
            👨‍🏫 Professeurs
          </button>
          
          <button
            onClick={() => setView("eleves")}
            className={`admin-sidebar-button ${view === "eleves" ? "active" : ""}`}
          >
            👥 Élèves
          </button>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            onLogout();
          }}
          className="admin-sidebar-button admin-sidebar-logout"
        >
          🚪 Déconnexion
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        <div className="admin-header">
          <h1>ADMINISTRATEUR</h1>
          <p>Gérer votre système de formation, gestion de données application</p>
        </div>

        {view === "formations" && <AdminFormations />}
        {view === "professeurs" && <AdminProfesseurs />}
        {view === "eleves" && <AdminEleves />}
      </div>
    </div>
  );
}