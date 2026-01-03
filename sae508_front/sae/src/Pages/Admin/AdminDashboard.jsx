import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminFormations from "./AdminFormations.jsx";
import AdminProfesseurs from "./AdminProfesseurs.jsx";
import AdminEleves from "./AdminEleves.jsx";
import "../../css/AdminDashboard.css";
import logotxl from "../../assets/logotxl.png";

// Importation avec les bonnes extensions .jpg
import illustration1 from "../../assets/illustration1.jpg"; 
import illustration2 from "../../assets/illustration2.jpg";

export default function AdminDashboard({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState("dashboard");

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setView("dashboard");
    }
  }, [location.pathname]);

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <button
          className="admin-sidebar-logo"
          onClick={() => setView("dashboard")}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <img src={logotxl} alt="Logo" />
        </button>

        <div className="admin-sidebar-menu">
          <button
            onClick={() => setView("formations")}
            className={`admin-sidebar-button ${view === "formations" ? "active" : ""}`}
          >
            Formations
          </button>
          <button
            onClick={() => setView("professeurs")}
            className={`admin-sidebar-button ${view === "professeurs" ? "active" : ""}`}
          >
            Professeurs
          </button>
          <button
            onClick={() => setView("eleves")}
            className={`admin-sidebar-button ${view === "eleves" ? "active" : ""}`}
          >
            Élèves
          </button>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            onLogout();
          }}
          className="admin-sidebar-button admin-sidebar-logout"
        >
          Déconnexion
        </button>
      </div>

      <div className="admin-main-content">
        {view === "dashboard" && (
          <div className="admin-welcome-container">
            <div className="admin-welcome-banner">
              <h1>ADMINISTRATEUR</h1>
              <p>Gérez votre système de formation grâce à notre application</p>
            </div>

            <div className="admin-cards-grid">
              {/* Carte Formations avec illustration1.jpg */}
              <div className="admin-card card-horizontal">
                <div className="card-inner">
                  <div className="card-illustration">
                    <img src={illustration1} alt="Formations" style={{ width: '350px', height: 'auto' }} />
                  </div>
                  <div className="card-text">
                    <h3>Retrouvez toutes vos formations</h3>
                    <p>Liste de vos formations avec leurs sessions correspondantes.</p>
                    <button className="btn-orange" onClick={() => setView("formations")}>
                      Accédez
                    </button>
                  </div>
                </div>
              </div>

              <div className="admin-card card-blue">
                <div className="card-blue-content">
                  <h3>Retrouvez tout vos professeurs</h3>
                  <p>Liste de vos professeurs avec toutes les infos dont vous avez besoin.</p>
                </div>
                <button className="btn-white" onClick={() => setView("professeurs")}>
                  Accédez
                </button>
              </div>

              {/* Carte Élèves avec illustration2.jpg */}
              <div className="admin-card card-horizontal">
                <div className="card-inner">
                  <div className="card-illustration">
                    <img src={illustration2} alt="Élèves" style={{ width: '350px', height: 'auto' }} />
                  </div>
                  <div className="card-text">
                    <h3>Retrouvez vos élèves</h3>
                    <p>Liste de vos élèves avec leurs sessions correspondantes.</p>
                    <button className="btn-orange" onClick={() => setView("eleves")}>
                      Accédez
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === "formations" && <AdminFormations />}
        {view === "professeurs" && <AdminProfesseurs />}
        {view === "eleves" && <AdminEleves />}
      </div>
    </div>
  );
}
