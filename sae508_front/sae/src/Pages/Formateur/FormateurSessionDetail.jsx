import { useEffect, useState } from "react";
import "../../css/FormationSessionDetail.css";

export default function FormateurSessionDetail({ session, onBack }) {
  const token = localStorage.getItem("token");
  const [inscriptions, setInscriptions] = useState([]);
  const [emargementStatus, setEmargementStatus] = useState({}); // <-- état pour gérer le bouton actif

  // popup notes
  const [showPopup, setShowPopup] = useState(false);
  const [selectedInscription, setSelectedInscription] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

  // champs note
  const [nom, setNom] = useState("");
  const [valeur, setValeur] = useState("");
  const [coef, setCoef] = useState("");

  const today = new Date().toISOString().split("T")[0];

  // =========================
  // CHARGEMENT INSCRIPTIONS + NOTES
  // =========================
  useEffect(() => {
    if (!session?.id) return;

    fetch(`http://localhost:8080/api/formateur/sessions/${session.id}/eleves`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(async (data) => {
        if (!Array.isArray(data)) data = [];
        const withNotes = await Promise.all(
          data.map(async (i) => {
            const res = await fetch(
              `http://localhost:8080/api/inscriptions/${i.id}/notes`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            i.notes = await res.json();
            return i;
          })
        );
        setInscriptions(withNotes);
      })
      .catch(console.error);
  }, [session, token]);

  // =========================
  // NOTES
  // =========================
  const openPopup = (inscription, note = null) => {
    setSelectedInscription(inscription);
    setEditingNote(note);
    setNom(note?.nom || "");
    setValeur(note?.valeur || "");
    setCoef(note?.coefficient || "");
    setShowPopup(true);
  };

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

  const deleteNote = (inscription, noteId) => {
    if (!window.confirm("Supprimer cette note ?")) return;

    fetch(`http://localhost:8080/api/inscriptions/notes/${noteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setInscriptions(prev =>
        prev.map(i =>
          i.id === inscription.id
            ? { ...i, notes: i.notes.filter(n => n.id !== noteId) }
            : i
        )
      );
    });
  };

  // =========================
  // ÉMARGEMENT
  // =========================
  const emarger = (inscriptionId, statut) => {
    fetch("http://localhost:8080/api/emargement/valider", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inscriptionId,
        date: today,
        statut,
      }),
    })
      .then(() => {
        // met à jour le bouton actif
        setEmargementStatus(prev => ({ ...prev, [inscriptionId]: statut }));
      })
      .catch(() => alert("Erreur émargement"));
  };

  // =========================
  // GÉNÉRATION PDF
  // =========================
  const genererPdf = () => {
    fetch(
      `http://localhost:8080/api/emargement/session/${session.id}/pdf?date=${today}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `emargement_session_${session.id}_${today}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert("Erreur génération PDF"));
  };

  if (!session) return <p>Session non sélectionnée.</p>;

  return (
    <div className="formateur-session-detail-container">
      {/* RETOUR */}
      <button className="formateur-back-button" onClick={onBack}>
        Retour
      </button>

      <h2 className="formateur-session-detail-title">
        {session.formation?.titre}
      </h2>

      {/* BOUTON PDF */}
      <div style={{ marginBottom: "15px" }}>
        <button className="formateur-btn-add" onClick={genererPdf}>
          Générer feuille d’émargement (PDF)
        </button>
      </div>

      <div className="formateur-session-detail-card">
        <table className="formateur-detail-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Notes</th>
              <th>Émargement ({today})</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inscriptions.length === 0 ? (
              <tr>
                <td colSpan="5">Aucun inscrit</td>
              </tr>
            ) : (
              inscriptions.map(i => (
                <tr key={i.id}>
                  <td><strong>{i.participant?.nom}</strong></td>
                  <td>{i.participant?.prenom}</td>

                  <td>
                    {(i.notes || []).length === 0 ? (
                      <i>Aucune note</i>
                    ) : (
                      i.notes.map(n => (
                        <div key={n.id} className="note-item">
                          {n.nom} : <b>{n.valeur}/20</b> (coef {n.coefficient})
                          <button onClick={() => openPopup(i, n)}>modifier</button>
                          <button onClick={() => deleteNote(i, n.id)}>supprimer</button>
                        </div>
                      ))
                    )}
                  </td>

                  <td>
                    <button
                      className={`emargement-btn ${emargementStatus[i.id] === "PRESENT" ? "active" : ""}`}
                      onClick={() => emarger(i.id, "PRESENT")}
                    >
                      present
                    </button>
                    <button
                      className={`emargement-btn ${emargementStatus[i.id] === "ABSENT" ? "active" : ""}`}
                      onClick={() => emarger(i.id, "ABSENT")}
                    >
                      absent
                    </button>
                    <button
                      className={`emargement-btn ${emargementStatus[i.id] === "RETARD" ? "active" : ""}`}
                      onClick={() => emarger(i.id, "RETARD")}
                    >
                      retard
                    </button>
                  </td>

                  <td>
                    <button onClick={() => openPopup(i)}>ajouter</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODALE NOTE */}
      {showPopup && selectedInscription && (
        <div className="formateur-modal-backdrop" onClick={() => setShowPopup(false)}>
          <div className="formateur-modal" onClick={e => e.stopPropagation()}>
            <h3>{editingNote ? "Modifier la note" : "Nouvelle note"}</h3>

            <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom de la note" />
            <input type="number" value={valeur} onChange={e => setValeur(e.target.value)} placeholder="Valeur (ex: 15)" />
            <input type="number" value={coef} onChange={e => setCoef(e.target.value)} placeholder="Coefficient" />

            <div className="formateur-modal-actions">
              <button onClick={submitNote}>{editingNote ? "Modifier" : "Ajouter"}</button>
              <button onClick={() => setShowPopup(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
