import { useEffect, useState } from "react";
import "../../css/FormationSessionDetail.css"; // Assurez-vous que le nom du fichier CSS correspond

export default function FormateurSessionDetail({ session, onBack }) {
  const token = localStorage.getItem("token");
  const [inscriptions, setInscriptions] = useState([]);

  // popup states
  const [showPopup, setShowPopup] = useState(false);
  const [selectedInscription, setSelectedInscription] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

  // champs note
  const [nom, setNom] = useState("");
  const [valeur, setValeur] = useState("");
  const [coef, setCoef] = useState("");

  // Charger les inscriptions et leurs notes
  useEffect(() => {
    if (!session?.id) return;

    fetch(`http://localhost:8080/api/formateur/sessions/${session.id}/eleves`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) data = [];
        // Charger les notes pour chaque inscription
        Promise.all(
          data.map(async (i) => {
            const res = await fetch(
              `http://localhost:8080/api/inscriptions/${i.id}/notes`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            i.notes = await res.json();
            return i;
          })
        ).then(setInscriptions);
      })
      .catch(console.error);
  }, [session, token]);

  // ouvrir popup pour ajouter ou modifier
  const openPopup = (inscription, note = null) => {
    setSelectedInscription(inscription);
    setEditingNote(note);
    setNom(note?.nom || "");
    setValeur(note?.valeur || "");
    setCoef(note?.coefficient || "");
    setShowPopup(true);
  };

  // envoyer note (ajout ou modification)
  const submitNote = () => {
    if (!selectedInscription) return;

    const url = editingNote
      ? `http://localhost:8080/api/inscriptions/notes/${editingNote.id}`
      : `http://localhost:8080/api/inscriptions/${selectedInscription.id}/notes`;

    const method = editingNote ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom,
        valeur: Number(valeur),
        coefficient: Number(coef),
      }),
    })
      .then((res) => res.json())
      .then((note) => {
        setInscriptions((prev) =>
          prev.map((i) =>
            i.id === selectedInscription.id
              ? {
                  ...i,
                  notes: editingNote
                    ? i.notes.map((n) => (n.id === note.id ? note : n))
                    : [...(i.notes || []), note],
                }
              : i
          )
        );
        setShowPopup(false);
        setEditingNote(null);
      })
      .catch(console.error);
  };

  // supprimer note
  const deleteNote = (inscription, noteId) => {
    if (!window.confirm("Supprimer cette note ?")) return;

    fetch(`http://localhost:8080/api/inscriptions/notes/${noteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setInscriptions((prev) =>
          prev.map((i) =>
            i.id === inscription.id
              ? { ...i, notes: i.notes.filter((n) => n.id !== noteId) }
              : i
          )
        );
      })
      .catch(console.error);
  };

  if (!session) return <p>Session non sélectionnée.</p>;

  return (
    <div className="formateur-session-detail-container">
      {/* --- FOND FLOU (Arrière-plan style Admin) --- */}
      <div className="bg-blur-wrapper">
        <div className="blur-blob blob-cyan"></div>
        <div className="blur-blob blob-purple"></div>
      </div>

      {/* --- BOUTON RETOUR --- */}
      <button className="formateur-back-button" onClick={onBack}>
        ← Retour
      </button>

      {/* --- TITRE --- */}
      <h2 className="formateur-session-detail-title">
        {session.formation?.titre || "Titre inconnu"}
      </h2>

      {/* --- CARTE DU TABLEAU --- */}
      <div className="formateur-session-detail-card">
        <table className="formateur-detail-table">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Nom</th>
              <th style={{ width: "20%" }}>Prénom</th>
              <th style={{ width: "45%" }}>Notes & Coefficients</th>
              <th style={{ width: "15%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {inscriptions.length === 0 ? (
              <tr>
                <td colSpan="4" className="formateur-table-empty">
                  <span className="formateur-table-empty-icon"></span>
                  Aucun élève inscrit à cette session
                </td>
              </tr>
            ) : (
              inscriptions.map((i) => (
                <tr key={i.id}>
                  <td><strong>{i.participant?.nom || "-"}</strong></td>
                  <td>{i.participant?.prenom || "-"}</td>
                  <td>
                    {/* Liste des notes stylisée */}
                    {(i.notes || []).length === 0 ? (
                      <span style={{ color: "#999", fontStyle: "italic" }}>
                        Aucune note
                      </span>
                    ) : (
                      (i.notes || []).map((n) => (
                        <div key={n.id} className="note-item">
                          <span className="note-info">
                            {n.nom} : <strong>{n.valeur}/20</strong>{" "}
                            <small>(coef. {n.coefficient})</small>
                          </span>
                          <div className="note-actions">
                            <button 
                              className="btn-icon-edit"
                              onClick={() => openPopup(i, n)} 
                              title="Modifier"
                            >
                              modifier
                            </button>
                            <button 
                              className="btn-icon-delete"
                              onClick={() => deleteNote(i, n.id)} 
                              title="Supprimer"
                            >
                              
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </td>
                  <td>
                    <button
                      className="formateur-btn-add"
                      onClick={() => openPopup(i)}
                    >
                      Note
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- MODALE --- */}
      {showPopup && selectedInscription && (
        <div
          className="formateur-modal-backdrop"
          onClick={() => {
            setShowPopup(false);
            setEditingNote(null);
          }}
        >
          <div className="formateur-modal" onClick={(e) => e.stopPropagation()}>
            <h3>
              {editingNote ? "Modifier la note" : "Nouvelle note"} <br />
              <span style={{ fontSize: "14px", fontWeight: "400", color: "#666" }}>
                pour {selectedInscription.participant?.nom}{" "}
                {selectedInscription.participant?.prenom}
              </span>
            </h3>

            <div className="formateur-modal-form">
              <input
                placeholder="Intitulé (ex: Partiel 1)"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="number"
                  placeholder="Note /20"
                  value={valeur}
                  onChange={(e) => setValeur(e.target.value)}
                  style={{ flex: 1 }}
                />

                <input
                  type="number"
                  placeholder="Coef."
                  value={coef}
                  onChange={(e) => setCoef(e.target.value)}
                  style={{ width: '80px' }}
                />
              </div>

              <div className="formateur-modal-actions">
                <button className="btn-valider" onClick={submitNote}>
                  {editingNote ? "Enregistrer" : "Ajouter"}
                </button>
                <button
                  className="btn-annuler"
                  onClick={() => {
                    setShowPopup(false);
                    setEditingNote(null);
                  }}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}