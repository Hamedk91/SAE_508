import { useState, useEffect } from "react";
import "../../css/AdminEleves.css";

export default function AdminEleves() {
  const token = localStorage.getItem("token");
  const authHeader = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUtilisateur, setCurrentUtilisateur] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    role: "USER",
  });

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/utilisateurs", {
        headers: authHeader,
      });
      if (!res.ok) throw new Error("Erreur");
      const data = await res.json();
      setUtilisateurs(data);
      setLoading(false);
    } catch (err) {
      setError("Impossible de charger les utilisateurs");
      setLoading(false);
    }
  };

  const openModal = (u = null) => {
    setCurrentUtilisateur(u);
    setFormData(
      u ? { ...u } : { nom: "", prenom: "", email: "", role: "USER" }
    );
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentUtilisateur(null);
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = currentUtilisateur ? "PUT" : "POST";
      const url = currentUtilisateur
        ? `http://localhost:8080/api/admin/utilisateurs/${currentUtilisateur.id}`
        : "http://localhost:8080/api/admin/utilisateurs";

      const res = await fetch(url, {
        method,
        headers: authHeader,
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erreur");

      fetchUtilisateurs();
      closeModal();
    } catch {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/admin/utilisateurs/${id}`, {
        method: "DELETE",
        headers: authHeader,
      });
      if (!res.ok) throw new Error("Erreur");
      fetchUtilisateurs();
    } catch {
      alert("Erreur suppression");
    }
  };

  if (loading) return <p style={{ textAlign: "center", padding: "60px" }}>Chargement...</p>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>👥 Utilisateurs</h2>
        <button className="admin-add-button" onClick={() => openModal()}>
          ➕ Ajouter un utilisateur
        </button>
      </div>

      {error && <div className="admin-error">{error}</div>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.length === 0 ? (
            <tr>
              <td colSpan="5" className="admin-table-empty">
                <div className="admin-table-empty-icon">👥</div>
                <p>Aucun utilisateur enregistré</p>
              </td>
            </tr>
          ) : (
            utilisateurs.map((u) => (
              <tr key={u.id}>
                <td>{u.nom}</td>
                <td>{u.prenom}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => openModal(u)}>Modifier</button>
                  <button onClick={() => handleDelete(u.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {modalVisible && (
        <div className="admin-modal-backdrop" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{currentUtilisateur ? "Modifier l'utilisateur" : "Nouvel utilisateur"}</h3>
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
              <select value={formData.role} onChange={(e) => handleChange("role", e.target.value)}>
                <option value="USER">Utilisateur</option>
                <option value="ADMIN">Admin</option>
                <option value="FORMATEUR">Formateur</option>
              </select>
              <div className="admin-modal-actions">
                <button type="submit">{currentUtilisateur ? "Modifier" : "Ajouter"}</button>
                <button type="button" onClick={closeModal}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
