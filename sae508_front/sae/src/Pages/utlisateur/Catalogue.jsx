import { useEffect, useState } from "react";
import "../../css/Catalogue.css";
import catalogueImage from "../../assets/Catalogue.jpg";

export default function Catalogue() {
  const token = localStorage.getItem("token");
  const authHeader = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const [categories, setCategories] = useState([]);
  const [formations, setFormations] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [formationDetail, setFormationDetail] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then(res => res.json())
      .then(setCategories);
  }, []);

  const loadFormations = (id) => {
    setSelectedCategorie(id);
    setSelectedFormation(null);
    setFormationDetail(null);
    fetch(`http://localhost:8080/api/formations/categorie/${id}`)
      .then(res => res.json())
      .then(setFormations);
  };

  const loadSessions = (formation) => {
    setSelectedFormation(formation.id);
    setFormationDetail(formation);
    fetch(`http://localhost:8080/api/sessions/formation/${formation.id}`)
      .then(res => res.json())
      .then(setSessions);
  };

  const payerEtInscrire = async (session) => {
    const res = await fetch("http://localhost:8080/api/paiement/session", {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({ sessionId: session.id })
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  const retour = () => {
    setSelectedCategorie(null);
    setSelectedFormation(null);
    setFormationDetail(null);
    setFormations([]);
    setSessions([]);
  };

  /* ===== PAGE DÉTAIL FORMATION ===== */
  if (formationDetail) {
    return (
      <div className="formation-detail-page">
        <button className="back-button" onClick={retour}>← Retour</button>

        <div className="formation-header">
          <div
            className="formation-image-large"
            style={{ backgroundImage: `url(${catalogueImage})` }}
          />
          <div className="formation-info">
            <h1>{formationDetail.titre}</h1>
            <p>{formationDetail.description}</p>
            <p><strong>Durée :</strong> {formationDetail.duree} h</p>
            <p><strong>Prix :</strong> {formationDetail.prix} €</p>
          </div>
        </div>

        <div className="sessions-section">
          <h3>Sessions disponibles</h3>

          <table className="sessions-table">
            <thead>
              <tr>
                <th>Début</th>
                <th>Fin</th>
                <th>Places</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(s => (
                <tr key={s.id}>
                  <td>{new Date(s.dateDebut).toLocaleDateString()}</td>
                  <td>{new Date(s.dateFin).toLocaleDateString()}</td>
                  <td>{s.placesRestantes}</td>
                  <td>
                    <button
                      disabled={s.placesRestantes <= 0}
                      onClick={() => payerEtInscrire(s)}
                    >
                      {s.placesRestantes <= 0 ? "Complet" : "S'inscrire"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /* ===== CATALOGUE ===== */
  return (
    <div className="catalogue-page">
      <h2>Catalogue</h2>

      {!selectedCategorie ? (
        <div className="categories-grid">
          {categories.map(c => (
            <div
              key={c.id}
              className="category-card"
              onClick={() => loadFormations(c.id)}
            >
              <h4>{c.nom}</h4>
            </div>
          ))}
        </div>
      ) : (
        <>
          <button className="back-button" onClick={retour}>← Catégories</button>

          <div className="formations-grid">
            {formations.map(f => (
              <div
                key={f.id}
                className="formation-card"
                onClick={() => loadSessions(f)}
              >
                <div
                  className="formation-card-image"
                  style={{ backgroundImage: `url(${catalogueImage})` }}
                />
                <div className="formation-card-content">
                  <h4>{f.titre}</h4>
                  <p>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
