import { useState } from "react";
import FormateurSessions from "../Formateur/FormateurSession";
import FormateurProfil from "../Formateur/FormateurProfil";
import "../../css/FormateurDashboard.css";
import logotxl from "../../assets/logotxl.png";
import profilIcon from "../../assets/profil.png";

export default function FormateurDashboard({ onLogout }) {
  const [view, setView] = useState("sessions");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="formateur-dashboard">
      <nav className="formateur-navbar">
        <div className="formateur-navbar-logo">
          <img src={logotxl} alt="TxL Logo" />
        </div>

        <div className="formateur-navbar-menu">
          <button
            className={`formateur-navbar-link ${view === "sessions" ? "active" : ""}`}
            onClick={() => setView("sessions")}
          >
            Mes sessions
          </button>
        </div>

        <div className="formateur-navbar-profile">
          <button 
            className="formateur-profile-icon"
            onClick={() => setShowMenu(!showMenu)}
          >
            <img src={profilIcon} alt="Profil" />
          </button>

          {showMenu && (
            <div className="formateur-dropdown-menu">
              <button onClick={() => { setView("profil"); setShowMenu(false); }}>
                Profil
              </button>
              <button onClick={onLogout} className="logout-btn">
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="formateur-content">
        {view === "sessions" && <FormateurSessions />}
        {view === "profil" && <FormateurProfil />}
      </main>
    </div>
  );
}