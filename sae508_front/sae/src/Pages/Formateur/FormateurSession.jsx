import { useEffect, useState } from "react";
import FormateurSessionDetail from "./FormateurSessionDetail";
import "../../css/FormateurSession.css";

export default function FormateurSessions() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const formateurId = user?.id;

  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!formateurId) {
      setError("Formateur non identifié");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/api/formateur/${formateurId}/sessions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSessions(data);
        } else {
          setSessions([]);
          console.warn("Réponse inattendue API sessions", data);
        }
      })
      .catch(err => {
        console.error(err);
        setError("Impossible de récupérer les sessions");
      })
      .finally(() => setLoading(false));
  }, [formateurId, token]);

  if (selectedSession) {
    return (
      <FormateurSessionDetail
        session={selectedSession}
        onBack={() => setSelectedSession(null)}
      />
    );
  }

  if (loading) return <p>Chargement des sessions...</p>;
  if (error) return <p className="error">{error}</p>;
  if (sessions.length === 0) return <p>Aucune session assignée.</p>;

  return (
    <div className="formateur-sessions">
      <h2>Mes sessions</h2>
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
              📅{" "}
              {s.dateDebut
                ? new Date(s.dateDebut).toLocaleDateString()
                : "?"}{" "}
              →{" "}
              {s.dateFin
                ? new Date(s.dateFin).toLocaleDateString()
                : "?"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
