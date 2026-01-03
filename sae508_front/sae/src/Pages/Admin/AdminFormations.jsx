import { useEffect, useState } from "react";
import "../../css/AdminFormations.css";

export default function AdminFormations() {
  const token = localStorage.getItem("token");

  const authHeader = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const [categories, setCategories] = useState([]);
  const [formations, setFormations] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [formateurs, setFormateurs] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [selectedFormateur, setSelectedFormateur] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("add");
  const [type, setType] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchCategories();
    fetchFormateurs();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/categories", { headers: authHeader });
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      setCategories([]);
    }
    setLoading(false);
  };

  const fetchFormateurs = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/formateurs", { headers: authHeader });
      const data = await res.json();
      setFormateurs(Array.isArray(data) ? data : []);
    } catch {
      setFormateurs([]);
    }
  };

  const fetchFormations = async (categorieId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/formations/categorie/${categorieId}`, { headers: authHeader });
      const data = await res.json();
      setFormations(Array.isArray(data) ? data : []);
      setSessions([]);
    } catch {
      setFormations([]);
    }
  };

  const fetchSessions = async (formationId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/sessions/formation/${formationId}`, { headers: authHeader });
      const data = await res.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch {
      setSessions([]);
    }
  };

  const openAddModal = (type) => {
    setMode("add");
    setType(type);
    setFormData({});
    if (type === "session") setSelectedFormateur(null);
    setShowModal(true);
  };

  const openEditModal = (type, data) => {
    setMode("edit");
    setType(type);
    setFormData(data);
    if (type === "session") setSelectedFormateur(data.formateur || null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "";
    const method = mode === "add" ? "POST" : "PUT";
    let body = {};

    if (type === "categorie") {
      body = { nom: formData.nom || "" };
      url = mode === "add" ? "http://localhost:8080/api/categories" : `http://localhost:8080/api/categories/${formData.id}`;
    }

    if (type === "formation") {
      body = {
        titre: formData.titre || "",
        duree: Number(formData.duree) || 0,
        prix: Number(formData.prix) || 0,
        categorie: { id: selectedCategorie.id },
      };
      url = mode === "add" ? "http://localhost:8080/api/formations" : `http://localhost:8080/api/formations/${formData.id}`;
    }

    if (type === "session") {
      if (!selectedFormateur) { alert("Veuillez sélectionner un formateur."); return; }
      body = {
        lieu: formData.lieu || "",
        dateDebut: formData.dateDebut ? new Date(formData.dateDebut).toISOString() : null,
        dateFin: formData.dateFin ? new Date(formData.dateFin).toISOString() : null,
        placesMax: Number(formData.placesMax) || 0,
        placesRestantes: Number(formData.placesRestantes) || 0,
        statut: formData.statut || "",
        formation: { id: selectedFormation.id },
        formateur: { id: selectedFormateur.id },
      };
      url = mode === "add" ? "http://localhost:8080/api/sessions" : `http://localhost:8080/api/sessions/${formData.id}`;
    }

    try {
      await fetch(url, { method, headers: authHeader, body: JSON.stringify(body) });
      setShowModal(false);
      if (type === "categorie") fetchCategories();
      if (type === "formation") fetchFormations(selectedCategorie.id);
      if (type === "session") fetchSessions(selectedFormation.id);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (url, callback) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      await fetch(url, { method: "DELETE", headers: authHeader });
      callback();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p style={{ textAlign: "center", padding: "60px" }}>Chargement...</p>;

  return (
    <div className="admin-formations-container">
      <div className="bg-blur-wrapper">
        <div className="blur-blob blob-cyan"></div>
        <div className="blur-blob blob-purple"></div>
      </div>

      <h2 className="admin-formations-title">Gestion des formations</h2>

      {/* ===== CATEGORIES ===== */}
      {!selectedCategorie && (
        <>
          <div className="admin-formations-header">
          </div>
          <div className="admin-formations-table-card">
            <ul className="admin-list">
              {categories.length === 0 ? (
                <li className="admin-list-empty">
                  <div className="admin-table-empty-icon">📚</div>
                  <p>Aucune catégorie enregistrée</p>
                </li>
              ) : (
                categories.map((c) => (
                  <li key={c.id} className="admin-list-item" onClick={() => { setSelectedCategorie(c); fetchFormations(c.id); }}>
                    <span>{c.nom}</span>
                    <div className="admin-actions">
                      <button onClick={(e) => { e.stopPropagation(); openEditModal("categorie", c); }} className="admin-btn-modifier">Modifier</button>
                      <button onClick={(e) => { e.stopPropagation(); deleteItem(`http://localhost:8080/api/categories/${c.id}`, fetchCategories); }} className="admin-btn-supprimer">Supprimer</button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="admin-actions-footer">
            <button onClick={() => openAddModal("categorie")} className="admin-add-button">Ajouter une catégorie</button>
          </div>
        </>
      )}

      {/* ===== FORMATIONS ===== */}
      {selectedCategorie && !selectedFormation && (
        <>
          <button className="admin-back-button" onClick={() => setSelectedCategorie(null)}>← Retour</button>
          <div className="admin-formations-header">
            <h3>Formations – {selectedCategorie.nom}</h3>
          </div>
          <div className="admin-formations-table-card">
            <ul className="admin-list">
              {formations.length === 0 ? (
                <li className="admin-list-empty">
                  <div className="admin-table-empty-icon">🎓</div>
                  <p>Aucune formation dans cette catégorie</p>
                </li>
              ) : (
                formations.map((f) => (
                  <li key={f.id} className="admin-list-item" onClick={() => { setSelectedFormation(f); fetchSessions(f.id); }}>
                    <span>{f.titre}</span>
                    <div className="admin-actions">
                      <button onClick={(e) => { e.stopPropagation(); openEditModal("formation", f); }} className="admin-btn-modifier">Modifier</button>
                      <button onClick={(e) => { e.stopPropagation(); deleteItem(`http://localhost:8080/api/formations/${f.id}`, () => fetchFormations(selectedCategorie.id)); }} className="admin-btn-supprimer">Supprimer</button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="admin-actions-footer">
            <button onClick={() => openAddModal("formation")} className="admin-add-button">Ajouter une formation</button>
          </div>
        </>
      )}

      {/* ===== SESSIONS ===== */}
      {selectedFormation && (
        <>
          <button className="admin-back-button" onClick={() => { setSelectedFormation(null); setSessions([]); }}>← Retour</button>
          <div className="admin-formations-header">
            <h3>Sessions – {selectedFormation.titre}</h3>
          </div>
          <div className="admin-formations-table-card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Lieu</th>
                  <th>Début</th>
                  <th>Fin</th>
                  <th>Places</th>
                  <th>Statut</th>
                  <th>Formateur</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="admin-table-empty">
                      <div className="admin-table-empty-icon">📅</div>
                      <p>Aucune session pour cette formation</p>
                    </td>
                  </tr>
                ) : (
                  sessions.map((s) => (
                    <tr key={s.id}>
                      <td>{s.lieu}</td>
                      <td>{new Date(s.dateDebut).toLocaleDateString()}</td>
                      <td>{new Date(s.dateFin).toLocaleDateString()}</td>
                      <td>{s.placesRestantes} / {s.placesMax}</td>
                      <td>{s.statut}</td>
                      <td>{s.formateur?.nom} {s.formateur?.prenom}</td>
                      <td>
                        <button onClick={() => openEditModal("session", s)} className="admin-btn-modifier">Modifier</button>
                        <button onClick={() => deleteItem(`http://localhost:8080/api/sessions/${s.id}`, () => fetchSessions(selectedFormation.id))} className="admin-btn-supprimer">Supprimer</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="admin-actions-footer">
            <button onClick={() => openAddModal("session")} className="admin-add-button">Ajouter une session</button>
          </div>
        </>
      )}

      {/* Modale (inchangée mais nécessaire ici pour le rendu) */}
      {showModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{mode === "add" ? "Ajouter" : "Modifier"} {type}</h3>
            <form onSubmit={handleSubmit} className="admin-modal-form">
                {/* ... (Champs de formulaire identiques à votre code initial) */}
                {type === "categorie" && (
                    <input type="text" placeholder="Nom" value={formData.nom || ""} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} required />
                )}
                {type === "formation" && (
                    <>
                    <input type="text" placeholder="Titre" value={formData.titre || ""} onChange={(e) => setFormData({ ...formData, titre: e.target.value })} required />
                    <input type="number" placeholder="Durée" value={formData.duree || ""} onChange={(e) => setFormData({ ...formData, duree: e.target.value })} required />
                    <input type="number" placeholder="Prix" value={formData.prix || ""} onChange={(e) => setFormData({ ...formData, prix: e.target.value })} required />
                    </>
                )}
                {type === "session" && (
                    <>
                    <input type="text" placeholder="Lieu" value={formData.lieu || ""} onChange={(e) => setFormData({ ...formData, lieu: e.target.value })} required />
                    <input type="date" value={formData.dateDebut ? formData.dateDebut.split("T")[0] : ""} onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })} required />
                    <input type="date" value={formData.dateFin ? formData.dateFin.split("T")[0] : ""} onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })} required />
                    <input type="number" placeholder="Max" value={formData.placesMax || ""} onChange={(e) => setFormData({ ...formData, placesMax: e.target.value })} required />
                    <input type="number" placeholder="Restantes" value={formData.placesRestantes || ""} onChange={(e) => setFormData({ ...formData, placesRestantes: e.target.value })} required />
                    <input type="text" placeholder="Statut" value={formData.statut || ""} onChange={(e) => setFormData({ ...formData, statut: e.target.value })} required />
                    <select value={selectedFormateur?.id || ""} onChange={(e) => setSelectedFormateur(formateurs.find(f => f.id === Number(e.target.value)))} required>
                        <option value="">-- Formateur --</option>
                        {formateurs.map(f => <option key={f.id} value={f.id}>{f.nom} {f.prenom}</option>)}
                    </select>
                    </>
                )}
                <div className="admin-modal-actions">
                    <button type="submit">{mode === "add" ? "Ajouter" : "Modifier"}</button>
                    <button type="button" onClick={() => setShowModal(false)}>Annuler</button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
