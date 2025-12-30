import "../../css/FormateurProfil.css";

export default function FormateurProfil() {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  if (!user) {
    return <p>Utilisateur non connecté</p>;
  }

  return (
    <div className="formateur-profil">
      <h2>Mon profil</h2>
      <div className="profil-card">
        <p><strong>Nom :</strong> {user.nom}</p>
        <p><strong>Prénom :</strong> {user.prenom}</p>
        <p><strong>Email :</strong> {user.email}</p>
      </div>
    </div>
  );
}
