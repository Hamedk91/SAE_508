import { useEffect, useState } from "react";
import "../../css/MesFormations.css";

export default function MesFormations() {
  const token = localStorage.getItem("token");
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/participant/formations", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setFormations)
      .catch(console.error);
  }, [token]);

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("fr-FR") : "Non définie";

  const handleDelete = (sessionId) => {
    if (!window.confirm("Voulez-vous vraiment vous désinscrire de cette session ?")) return;

    fetch(`http://localhost:8080/api/participant/inscriptions/${sessionId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la désinscription");
        setFormations((prevFormations) =>
          prevFormations
            .map((f) => ({
              ...f,
              sessions: f.sessions.filter((s) => s.id !== sessionId),
            }))
            .filter((f) => f.sessions.length > 0)
        );
        alert("Désinscription réussie !");
      })
      .catch((err) => {
        console.error(err);
        alert("Impossible de se désinscrire");
      });
  };

  return (
    <div className="mes-sessions-page">
      <h1>Mes formations</h1>
      <div className="sections-grid">
        {formations.map((f) => (
          <div key={f.id} className="formation-card">
            <div className="formation-card-image"></div>
            <div className="formation-card-content">
              <span className="formation-category">Formation</span>
              <h4>{f.titre}</h4>
              <p>{f.description}</p>

              {f.sessions && f.sessions.length > 0 && (
                <div className="sessions-list">
                  {f.sessions.map((s) => (
                    <div key={s.id} className="session-item">
                      <p>
                        <strong>Début :</strong> {formatDate(s.dateDebut)}
                      </p>
                      <p>
                        <strong>Fin :</strong> {formatDate(s.dateFin)}
                      </p>
                      <p>
                        <strong>Note attribuée :</strong>{" "}
                        {s.note !== null ? s.note : "Non noté"}
                      </p>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(s.id)}
                      >
                        Supprimer l'inscription
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
