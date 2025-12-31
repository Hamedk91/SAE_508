import { useEffect, useState } from "react";
import "../../css/FormationSessionDetail.css";

export default function FormateurSessionDetail({ session, onBack }) {
  const token = localStorage.getItem("token");
  const [inscriptions, setInscriptions] = useState([]);

  // popup
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
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) data = [];
        // Charger les notes pour chaque inscription
        Promise.all(
          data.map(async i => {
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
      .then(res => res.json())
      .then(note => {
        setInscriptions(prev =>
          prev.map(i =>
            i.id === selectedInscription.id
              ? {
                  ...i,
                  notes: editingNote
                    ? i.notes.map(n => (n.id === note.id ? note : n))
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
        setInscriptions(prev =>
          prev.map(i =>
            i.id === inscription.id
              ? { ...i, notes: i.notes.filter(n => n.id !== noteId) }
              : i
          )
        );
      })
      .catch(console.error);
  };

  if (!session) return <p>Session non sélectionnée.</p>;

  return (
    <div className="session-detail">
      <button onClick={onBack}>⬅ Retour</button>

      <h2>{session.formation?.titre || "Titre inconnu"}</h2>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inscriptions.length === 0 && (
            <tr>
              <td colSpan="4">Aucun élève inscrit.</td>
            </tr>
          )}
          {inscriptions.map(i => (
            <tr key={i.id}>
              <td>{i.participant?.nom || "-"}</td>
              <td>{i.participant?.prenom || "-"}</td>
              <td>
                {(i.notes || []).map(n => (
                  <div key={n.id} className="note-item">
                    {n.nom} : {n.valeur} (coef {n.coefficient})
                    <button onClick={() => openPopup(i, n)}>✏️</button>
                    <button onClick={() => deleteNote(i, n.id)}>🗑️</button>
                  </div>
                ))}
              </td>
              <td>
                <button onClick={() => openPopup(i)}>➕ Ajouter</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && selectedInscription && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>
              {editingNote ? "Modifier" : "Ajouter"} une note pour{" "}
              {selectedInscription.participant?.nom || "-"}
            </h3>

            <input
              placeholder="Nom"
              value={nom}
              onChange={e => setNom(e.target.value)}
            />

            <input
              type="number"
              placeholder="Valeur"
              value={valeur}
              onChange={e => setValeur(e.target.value)}
            />

            <input
              type="number"
              placeholder="Coefficient"
              value={coef}
              onChange={e => setCoef(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={submitNote}>✅ Valider</button>
              <button
                onClick={() => {
                  setShowPopup(false);
                  setEditingNote(null);
                }}
              >
                ❌ Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
