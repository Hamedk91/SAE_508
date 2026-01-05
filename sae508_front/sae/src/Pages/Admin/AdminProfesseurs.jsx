import { useState, useEffect } from "react";
import "../../css/AdminProfesseurs.css";

export default function AdminProfesseurs() {
  const token = localStorage.getItem("token");
  const authHeader = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const [formateurs, setFormateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentFormateur, setCurrentFormateur] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    statut: "ACTIF",
  });

  useEffect(() => {
    fetchFormateurs();
  }, []);

  const fetchFormateurs = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/formateurs", {
        headers: authHeader,
      });
      if (!res.ok) throw new Error("Erreur");
      const data = await res.json();
      setFormateurs(data);
      setLoading(false);
    } catch (err) {
      setError("Impossible de charger les formateurs");
      setLoading(false);
    }
  };

  const openModal = (f = null) => {
    setCurrentFormateur(f);
    setFormData(f ? { ...f } : { nom: "", prenom: "", email: "", statut: "ACTIF" });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentFormateur(null);
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = currentFormateur ? "PUT" : "POST";
      const url = currentFormateur
        ? `http://localhost:8080/api/formateurs/${currentFormateur.id}`
        : "http://localhost:8080/api/formateurs";

      // On envoie seulement nom, prenom, email, statut
      const payload = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        statut: formData.statut,
      };

      const res = await fetch(url, {
        method,
        headers: authHeader,
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur");

      fetchFormateurs();
      closeModal();
    } catch {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce formateur ?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/formateurs/${id}`, {
        method: "DELETE",
        headers: authHeader,
      });
      if (!res.ok) throw new Error("Erreur");
      fetchFormateurs();
    } catch {
      alert("Erreur suppression");
    }
  };

  if (loading) return <p style={{ textAlign: "center", padding: "60px" }}>Chargement...</p>;

  return (
    <div className="admin-professeurs-container">
      <div className="bg-blur-wrapper">
        <div className="blur-blob blob-cyan"></div>
        <div className="blur-blob blob-purple"></div>
      </div>

      <h2 className="admin-professeurs-title">Formateurs</h2>
      {error && <div className="admin-error">{error}</div>}

      <div className="admin-professeurs-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formateurs.length === 0 ? (
              <tr>
                <td colSpan="5" className="admin-table-empty">
                  <div className="admin-table-empty-icon">👨‍🏫</div>
                  <p>Aucun formateur enregistré</p>
                </td>
              </tr>
            ) : (
              formateurs.map((f) => (
                <tr key={f.id}>
                  <td>{f.nom}</td>
                  <td>{f.prenom}</td>
                  <td>{f.email}</td>
                  <td>{f.statut}</td>
                  <td>
                    <button className="admin-btn-modifier" onClick={() => openModal(f)}>Modifier</button>
                    <button className="admin-btn-supprimer" onClick={() => handleDelete(f.id)}>Supprimer</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button className="admin-add-button" onClick={() => openModal()}>
        Ajouter un formateur
      </button>

      {modalVisible && (
        <div className="admin-modal-backdrop" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{currentFormateur ? "Modifier le formateur" : "Nouveau formateur"}</h3>
            <form onSubmit={handleSubmit} className="admin-modal-form">
              <input
                type="text"
                placeholder="Nom"
                value={formData.nom}
                onChange={(e) => handleChange("nom", e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={(e) => handleChange("prenom", e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
              <select value={formData.statut} onChange={(e) => handleChange("statut", e.target.value)}>
                <option value="ACTIF">Actif</option>
                <option value="INACTIF">Inactif</option>
              </select>
              <div className="admin-modal-actions">
                <button type="submit">{currentFormateur ? "Modifier" : "Ajouter"}</button>
                <button type="button" onClick={closeModal}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
