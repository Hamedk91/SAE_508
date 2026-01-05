import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/MesFormations.css";

export default function MesFormations() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===================== FETCH MES FORMATIONS ===================== */
  // useCallback pour pouvoir le passer à d'autres composants si besoin
  const fetchMesFormations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/participant/formations", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }

      const data = await res.json();
      setFormations(data || []);
    } catch (err) {
      console.error("Erreur chargement formations :", err);
      alert("Impossible de charger vos formations");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchMesFormations();
  }, [token, navigate, fetchMesFormations]);

  /* ===================== HELPERS ===================== */
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("fr-FR") : "Non définie";

  /* ===================== DÉSINSCRIPTION ===================== */
  const handleDelete = async (sessionId) => {
    if (!window.confirm("Voulez-vous vraiment vous désinscrire de cette session ?")) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/participant/inscriptions/${sessionId}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) throw new Error("Erreur désinscription");

      // Mise à jour locale propre
      setFormations((prev) =>
        prev
          .map((f) => ({ ...f, sessions: f.sessions.filter((s) => s.id !== sessionId) }))
          .filter((f) => f.sessions.length > 0)
      );

      alert("Désinscription réussie !");
    } catch (err) {
      console.error(err);
      alert("Impossible de se désinscrire");
    }
  };

  /* ===================== RENDER ===================== */
  if (loading) return <p style={{ textAlign: "center" }}>Chargement...</p>;

  if (formations.length === 0) {
    return (
      <div className="mes-sessions-page">
        <h1>Mes formations</h1>
        <p style={{ textAlign: "center" }}>
          Vous n’êtes inscrit à aucune formation pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="mes-sessions-page">
      <h1>Mes formations</h1>

      <div className="sections-grid">
        {formations.map((f) => (
          <div key={f.id} className="formation-card">
            <div className="formation-card-content">
              <span className="formation-category">Formation</span>

              <h4>{f.titre}</h4>
              <p>{f.description}</p>

              {f.sessions.map((s) => (
                <div key={s.id} className="session-item">
                  <p><strong>Début :</strong> {formatDate(s.dateDebut)}</p>
                  <p><strong>Fin :</strong> {formatDate(s.dateFin)}</p>
                  <p><strong>Lieu :</strong> {s.lieu || "Non défini"}</p>
                  <p><strong>Statut :</strong> {s.statut || "En attente"}</p>
                  <p><strong>Note :</strong> {s.note ?? "Non noté"}</p>

                  <div className="session-actions">
                    <button className="delete-button" onClick={() => handleDelete(s.id)}>
                      Supprimer l'inscription
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
