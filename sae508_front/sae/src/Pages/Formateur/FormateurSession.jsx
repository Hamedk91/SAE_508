import { useEffect, useState } from "react";
import FormateurSessionDetail from "./FormateurSessionDetail";
import "../../css/FormateurSession.css";
import devcard from "../../assets/devcard.png";

export default function FormateurSessions() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const formateurId = user?.id;

  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!formateurId) return;

    fetch(`http://localhost:8080/api/formateur/${formateurId}/sessions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setSessions(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [formateurId, token]);

  if (!formateurId) return <p>Formateur non identifié</p>;
  if (loading) return <p>Chargement des sessions...</p>;

  // Affichage détail session
  if (selectedSession) {
    return (
      <FormateurSessionDetail
        session={selectedSession}
        onBack={() => setSelectedSession(null)}
      />
    );
  }

  // Liste des sessions
  return (
    <div className="formateur-sessions">
       {/* Blobs de fond */}
    <div className="bg-blur-wrapper">
      <div className="blur-blob blob-blue"></div>
      <div className="blur-blob blob-pink"></div>
    </div>

      <h2>Mes sessions</h2>
      <p>Visualisez l'ensemble de vos interventions</p>

      {sessions.length === 0 && <p>Aucune session trouvée</p>}
      
      <div className="sessions-grid">
        {sessions.map(s => (
          <div
            key={s.id}
            className="session-card"
            onClick={() => setSelectedSession(s)}
          >
            <img 
              src={devcard} 
              alt={s.formation?.titre || "Formation"} 
              className="session-card-image"
            />
            <div className="session-card-content">
              <h3 className="session-card-title">
                {s.formation?.titre || "Formation inconnue"}
              </h3>
              <div className="session-card-location">
                {s.lieu || "Lieu non précisé"}
              </div>
              <div className="session-card-date">
                {s.dateDebut ? new Date(s.dateDebut).toLocaleDateString("fr-FR") : "Date non définie"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}