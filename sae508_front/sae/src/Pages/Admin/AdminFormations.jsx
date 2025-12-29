import { useEffect, useState } from "react";
import "../../css/AdminFormations.css";

export default function AdminFormations() {
  const token = localStorage.getItem("token");

  const authHeader = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // ================= STATES =================
  const [categories, setCategories] = useState([]);
  const [formations, setFormations] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [formateurs, setFormateurs] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [selectedFormateur, setSelectedFormateur] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("add"); // add | edit
  const [type, setType] = useState(""); // categorie | formation | session
  const [formData, setFormData] = useState({});

  // ================= FETCH =================
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

  // ================= MODAL =================
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

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "";
    const method = mode === "add" ? "POST" : "PUT";
    let body = {};

    // ====== CATEGORIES ======
    if (type === "categorie") {
      body = { nom: formData.nom || "" };
      url = mode === "add"
        ? "http://localhost:8080/api/categories"
        : `http://localhost:8080/api/categories/${formData.id}`;
    }

    // ====== FORMATIONS ======
    if (type === "formation") {
      body = {
        titre: formData.titre || "",
        duree: Number(formData.duree) || 0,
        prix: Number(formData.prix) || 0,
        categorie: { id: selectedCategorie.id },
      };
      url = mode === "add"
        ? "http://localhost:8080/api/formations"
        : `http://localhost:8080/api/formations/${formData.id}`;
    }

    // ====== SESSIONS ======
    if (type === "session") {
      if (!selectedFormateur) {
        alert("Veuillez sélectionner un formateur.");
        return;
      }

      // ✅ Conversion correcte des dates ISO
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

      url = mode === "add"
        ? "http://localhost:8080/api/sessions"
        : `http://localhost:8080/api/sessions/${formData.id}`;
    }

    try {
      await fetch(url, { method, headers: authHeader, body: JSON.stringify(body) });
    } catch (err) {
      console.error(err);
    }

    setShowModal(false);

    // Refresh
    if (type === "categorie") fetchCategories();
    if (type === "formation") fetchFormations(selectedCategorie.id);
    if (type === "session") fetchSessions(selectedFormation.id);
  };

  // ================= DELETE =================
  const deleteItem = async (url, callback) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      await fetch(url, { method: "DELETE", headers: authHeader });
    } catch (err) {
      console.error(err);
    }
    callback();
  };

  if (loading) return <p className="loading">Chargement...</p>;

  return (
    <div className="admin-formations-page">
      <h2>Gestion des formations</h2>

      {/* ===== CATEGORIES ===== */}
      {!selectedCategorie && (
        <>
          <div className="admin-header-actions">
            <h3>Catégories</h3>
            <button onClick={() => openAddModal("categorie")} className="admin-add-button">Ajouter</button>
          </div>
          <ul className="admin-list">
            {categories.map((c) => (
              <li key={c.id} className="admin-list-item" onClick={() => { setSelectedCategorie(c); fetchFormations(c.id); }}>
                <span>{c.nom}</span>
                <div className="admin-actions">
                  <button onClick={(e) => { e.stopPropagation(); openEditModal("categorie", c); }} className="admin-edit-button">Modifier</button>
                  <button onClick={(e) => { e.stopPropagation(); deleteItem(`http://localhost:8080/api/categories/${c.id}`, fetchCategories); }} className="admin-delete-button">Supprimer</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* ===== FORMATIONS ===== */}
      {selectedCategorie && !selectedFormation && (
        <>
          <button className="admin-back-button" onClick={() => setSelectedCategorie(null)}>← Retour</button>
          <div className="admin-header-actions">
            <h3>Formations – {selectedCategorie.nom}</h3>
            <button onClick={() => openAddModal("formation")} className="admin-add-button">Ajouter</button>
          </div>
          <ul className="admin-list">
            {formations.map((f) => (
              <li key={f.id} className="admin-list-item" onClick={() => { setSelectedFormation(f); fetchSessions(f.id); }}>
                <span>{f.titre}</span>
                <div className="admin-actions">
                  <button onClick={(e) => { e.stopPropagation(); openEditModal("formation", f); }} className="admin-edit-button">Modifier</button>
                  <button onClick={(e) => { e.stopPropagation(); deleteItem(`http://localhost:8080/api/formations/${f.id}`, () => fetchFormations(selectedCategorie.id)); }} className="admin-delete-button">Supprimer</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* ===== SESSIONS ===== */}
      {selectedFormation && (
        <>
          <button className="admin-back-button" onClick={() => { setSelectedFormation(null); setSessions([]); }}>← Retour</button>
          <div className="admin-header-actions">
            <h3>Sessions – {selectedFormation.titre}</h3>
            <button onClick={() => openAddModal("session")} className="admin-add-button">Ajouter</button>
          </div>
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
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td>{s.lieu}</td>
                  <td>{new Date(s.dateDebut).toLocaleDateString()}</td>
                  <td>{new Date(s.dateFin).toLocaleDateString()}</td>
                  <td>{s.placesRestantes} / {s.placesMax}</td>
                  <td>{s.statut}</td>
                  <td>{s.formateur?.nom} {s.formateur?.prenom}</td>
                  <td>
                    <button onClick={() => openEditModal("session", s)} className="admin-edit-button">Modifier</button>
                    <button onClick={() => deleteItem(`http://localhost:8080/api/sessions/${s.id}`, () => fetchSessions(selectedFormation.id))} className="admin-delete-button">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{mode === "add" ? "Ajouter" : "Modifier"} {type}</h3>
            <form onSubmit={handleSubmit}>
              {type === "categorie" && (
                <input
                  placeholder="Nom"
                  value={formData.nom || ""}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  required
                />
              )}

              {type === "formation" && (
                <>
                  <input
                    placeholder="Titre"
                    value={formData.titre || ""}
                    onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                    required
                  />
                  <input
                    placeholder="Durée"
                    value={formData.duree || ""}
                    onChange={(e) => setFormData({ ...formData, duree: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Prix"
                    value={formData.prix || ""}
                    onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
                  />
                </>
              )}

              {type === "session" && (
                <>
                  <input
                    placeholder="Lieu"
                    value={formData.lieu || ""}
                    onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                    required
                  />
                  <input
                    type="date"
                    value={formData.dateDebut ? formData.dateDebut.split("T")[0] : ""}
                    onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
                    required
                  />
                  <input
                    type="date"
                    value={formData.dateFin ? formData.dateFin.split("T")[0] : ""}
                    onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Places max"
                    value={formData.placesMax || ""}
                    onChange={(e) => setFormData({ ...formData, placesMax: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Places restantes"
                    value={formData.placesRestantes || ""}
                    onChange={(e) => setFormData({ ...formData, placesRestantes: e.target.value })}
                  />
                  <input
                    placeholder="Statut"
                    value={formData.statut || ""}
                    onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
                  />
                  <select
                    value={selectedFormateur?.id || ""}
                    onChange={(e) => setSelectedFormateur(formateurs.find(f => f.id === Number(e.target.value)))}
                    required
                  >
                    <option value="">-- Sélectionner un formateur --</option>
                    {formateurs.map(f => (
                      <option key={f.id} value={f.id}>{f.nom} {f.prenom}</option>
                    ))}
                  </select>
                </>
              )}

              <div className="admin-modal-actions">
                <button type="submit" className="admin-add-button">Enregistrer</button>
                <button type="button" className="admin-delete-button" onClick={() => setShowModal(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
