import { useState } from "react";
import FormateurSessions from "../Formateur/FormateurSession";
import FormateurProfil from "../Formateur/FormateurProfil";
import "../../css/FormateurDashboard.css";

export default function FormateurDashboard({ onLogout }) {
  const [view, setView] = useState("sessions");

  return (
    <div className="formateur-dashboard">
      <aside className="formateur-sidebar">
        <div className="formateur-logo">TxL</div>

        <button
          className={view === "sessions" ? "active" : ""}
          onClick={() => setView("sessions")}
        >
          📚 Mes sessions
        </button>

        <button
          className={view === "profil" ? "active" : ""}
          onClick={() => setView("profil")}
        >
          👤 Profil
        </button>

        <button className="logout" onClick={onLogout}>
          🚪 Déconnexion
        </button>
      </aside>

      <main className="formateur-content">
        {view === "sessions" && <FormateurSessions />}
        {view === "profil" && <FormateurProfil />}
      </main>
    </div>
  );
}
