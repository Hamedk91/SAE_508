import { useEffect, useState } from "react";
import "../../css/AdminFormations.css";

export default function AdminFormations() {
  const token = localStorage.getItem("token");
  const authHeader = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // ================== STATES ==================
  const [categories, setCategories] = useState([]);
  const [formations, setFormations] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [selectedFormation, setSelectedFormation] = useState(null);

  const [loading, setLoading] = useState(true);

  // ================== FETCH ==================
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:8080/api/categories", {
      headers: authHeader,
    });
    const data = await res.json();
    setCategories(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const fetchFormations = async (categorieId) => {
    const res = await fetch(
      `http://localhost:8080/api/formations/categorie/${categorieId}`,
      { headers: authHeader }
    );
    const data = await res.json();
    setFormations(Array.isArray(data) ? data : []);
    setSessions([]);
  };

  const fetchSessions = async (formationId) => {
    const res = await fetch(
      `http://localhost:8080/api/sessions/formation/${formationId}`,
      { headers: authHeader }
    );
    const data = await res.json();
    setSessions(Array.isArray(data) ? data : []);
  };

  // ================== DELETE ==================
  const deleteItem = async (url, callback) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    await fetch(url, { method: "DELETE", headers: authHeader });
    callback();
  };

  // ================== RENDER ==================
  if (loading) return <p style={{ padding: 40 }}>Chargement...</p>;

  return (
    <div className="admin-formations-page">
      <h2>📚 Gestion des formations</h2>

      {/* ================= CATEGORIES ================= */}
      {!selectedCategorie && (
        <>
          <h3>Catégories</h3>
          <ul className="admin-list">
            {categories.map((c) => (
              <li key={c.id} onClick={() => {
                setSelectedCategorie(c);
                fetchFormations(c.id);
              }}>
                📁 {c.nom}
                <button onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(`http://localhost:8080/api/categories/${c.id}`, fetchCategories);
                }}>🗑️</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* ================= FORMATIONS ================= */}
      {selectedCategorie && !selectedFormation && (
        <>
          <button onClick={() => setSelectedCategorie(null)}>⬅ Retour</button>
          <h3>Formations – {selectedCategorie.nom}</h3>

          <ul className="admin-list">
            {formations.map((f) => (
              <li key={f.id} onClick={() => {
                setSelectedFormation(f);
                fetchSessions(f.id);
              }}>
                📘 {f.titre}
                <button onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(`http://localhost:8080/api/formations/${f.id}`, () =>
                    fetchFormations(selectedCategorie.id)
                  );
                }}>🗑️</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* ================= SESSIONS ================= */}
      {selectedFormation && (
        <>
          <button onClick={() => {
            setSelectedFormation(null);
            setSessions([]);
          }}>⬅ Retour</button>

          <h3>Sessions – {selectedFormation.titre}</h3>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Lieu</th>
                <th>Début</th>
                <th>Fin</th>
                <th>Places</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td>{s.lieu}</td>
                  <td>{new Date(s.dateDebut).toLocaleDateString()}</td>
                  <td>{new Date(s.dateFin).toLocaleDateString()}</td>
                  <td>{s.placesRestantes}/{s.placesMax}</td>
                  <td>{s.statut}</td>
                  <td>
                    <button
                      onClick={() =>
                        deleteItem(
                          `http://localhost:8080/api/sessions/${s.id}`,
                          () => fetchSessions(selectedFormation.id)
                        )
                      }
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
