import { useEffect, useState } from "react";
import "../../css/Profil.css";
import profilIcon from "../../assets/profil.png";

export default function Profil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setError("Vous devez être connecté");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8080/api/participant/profil", {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération du profil");
        }
        return res.json();
      })
      .then(data => {
        console.log("Profil chargé:", data);
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="profil-page">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profil-page">
        <div className="error-box">
          <div className="error-icon">⚠️</div>
          <h3>Erreur</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profil-page">
        <div className="error-box">
          <p>Aucune donnée de profil disponible</p>
        </div>
      </div>
    );
  }

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    if (!dateString) return "Non définie";
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Obtenir les initiales pour l'avatar
  const getInitials = () => {
    const prenom = user.prenom || "";
    const nom = user.nom || "";
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="profil-page">
      <div className="profil-container">
        <div className="profil-card">
          {/* En-tête avec avatar */}
          <div className="profil-header">
            <div className="profil-avatar">
              <span className="profil-avatar-text">{getInitials()}</span>
            </div>
            <div className="profil-header-info">
              <h1 className="profil-name">{user.prenom} {user.nom}</h1>
              <span className="profil-role-badge">
                {user.role || "Participant"}
              </span>
            </div>
          </div>

          {/* Informations du profil */}
          <div className="profil-details">
            <div className="profil-section">
              <h2 className="profil-section-title">Informations personnelles</h2>
              
              <div className="profil-info-grid">
                <div className="profil-info-item">
                  <div className="profil-info-icon">👤</div>
                  <div className="profil-info-content">
                    <div className="profil-info-label">Nom complet</div>
                    <div className="profil-info-value">{user.nom} {user.prenom}</div>
                  </div>
                </div>

                <div className="profil-info-item">
                  <div className="profil-info-icon">✉️</div>
                  <div className="profil-info-content">
                    <div className="profil-info-label">Adresse email</div>
                    <div className="profil-info-value">{user.email}</div>
                  </div>
                </div>

                {user.telephone && (
                  <div className="profil-info-item">
                    <div className="profil-info-icon">📱</div>
                    <div className="profil-info-content">
                      <div className="profil-info-label">Téléphone</div>
                      <div className="profil-info-value">{user.telephone}</div>
                    </div>
                  </div>
                )}

                {user.entreprise && (
                  <div className="profil-info-item">
                    <div className="profil-info-icon">🏢</div>
                    <div className="profil-info-content">
                      <div className="profil-info-label">Entreprise</div>
                      <div className="profil-info-value">{user.entreprise}</div>
                    </div>
                  </div>
                )}

                <div className="profil-info-item">
                  <div className="profil-info-icon">🎓</div>
                  <div className="profil-info-content">
                    <div className="profil-info-label">Rôle</div>
                    <div className="profil-info-value">{user.role || "Participant"}</div>
                  </div>
                </div>

                {user.dateInscription && (
                  <div className="profil-info-item">
                    <div className="profil-info-icon">📅</div>
                    <div className="profil-info-content">
                      <div className="profil-info-label">Membre depuis</div>
                      <div className="profil-info-value">{formatDate(user.dateInscription)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}