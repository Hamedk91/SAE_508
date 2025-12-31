import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/FormationSessionDetail.css";

export default function SessionNotes() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [inscriptions, setInscriptions] = useState([]);

  useEffect(() => {
    if (!sessionId || !token) return;

    fetch(`http://localhost:8080/api/formateur/sessions/${sessionId}/eleves`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setInscriptions)
      .catch(console.error);
  }, [sessionId, token]);

  return (
    <div className="session-detail">
      <button onClick={() => navigate(-1)}>⬅ Retour</button>
      <h2>Notes de la session {sessionId}</h2>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {inscriptions.length === 0 && (
            <tr>
              <td colSpan="3">Aucun élève inscrit.</td>
            </tr>
          )}
          {inscriptions.map((i) => (
            <tr key={i.id}>
              <td>{i.participant?.nom || "-"}</td>
              <td>{i.participant?.prenom || "-"}</td>
              <td>
                {(i.notes || []).map((n) => (
                  <div key={n.id}>
                    {n.nom} : {n.valeur} (coef {n.coefficient})
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
