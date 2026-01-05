import "../../css/FormateurProfil.css";

export default function FormateurProfil() {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  if (!user) {
    return <p>Utilisateur non connecté</p>;
  }

  return (
    <div className="formateur-profil-container">
      {/* --- FOND FLOU --- */}
      <div className="bg-blur-wrapper">
        <div className="blur-blob blob-blue"></div>
        <div className="blur-blob blob-pink"></div>
      </div>

      {/* --- CONTENU --- */}
      <h2 className="formateur-profil-title">Mon Profil</h2>

      <div className="formateur-profil-card">
        <div className="profil-header">
          <div className="profil-avatar">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#004AAD" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4"/>
              <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
            </svg>
          </div>
          <h3 className="profil-name">{user.prenom} {user.nom}</h3>
        </div>

        <div className="profil-info">
          <div className="profil-info-item">
            <span className="profil-label">Nom</span>
            <span className="profil-value">{user.nom}</span>
          </div>

          <div className="profil-info-item">
            <span className="profil-label">Prénom</span>
            <span className="profil-value">{user.prenom}</span>
          </div>

          <div className="profil-info-item">
            <span className="profil-label">Email</span>
            <span className="profil-value">{user.email}</span>
          </div>

          <div className="profil-info-item">
            <span className="profil-label">Rôle</span>
            <span className="profil-badge">Formateur</span>
          </div>
        </div>
      </div>
    </div>
  );
}
