import { useEffect, useState } from "react";
import FormateurSessionDetail from "./FormateurSessionDetail";
import "../../css/FormateurSession.css";

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
      <h2>Mes sessions</h2>
      {sessions.length === 0 && <p>Aucune session trouvée</p>}
      <div className="sessions-grid">
        {sessions.map(s => (
          <div
            key={s.id}
            className="session-card"
            onClick={() => setSelectedSession(s)}
          >
            <h3>{s.formation?.titre || "Formation inconnue"}</h3>
            <p>📍 {s.lieu || "Lieu non précisé"}</p>
            <p>
              📅 {s.dateDebut ? new Date(s.dateDebut).toLocaleDateString() : "?"} →{" "}
              {s.dateFin ? new Date(s.dateFin).toLocaleDateString() : "?"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
