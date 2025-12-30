import { useEffect, useState } from "react";
import "../../css/FormationSessionDetail.css";

export default function FormateurSessionDetail({ session, onBack }) {
  const token = localStorage.getItem("token");
  const [inscriptions, setInscriptions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/formateur/sessions/${session.id}/eleves`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setInscriptions)
      .catch(console.error);
  }, [session.id]);

  const updateNote = (id, note) => {
    fetch(`http://localhost:8080/api/formateur/inscriptions/${id}/note`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then(res => res.json())
      .then(updated => {
        setInscriptions(prev =>
          prev.map(i => (i.id === updated.id ? updated : i))
        );
      });
  };

  return (
    <div className="session-detail">
      <button onClick={onBack}>⬅ Retour</button>

      <h2>{session.formation.titre}</h2>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {inscriptions.map(i => (
            <tr key={i.id}>
              <td>{i.participant.nom}</td>
              <td>{i.participant.prenom}</td>
              <td>
                <input
                  type="number"
                  value={i.note ?? ""}
                  onChange={e =>
                    updateNote(i.id, parseFloat(e.target.value))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
