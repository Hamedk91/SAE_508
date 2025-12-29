import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar({ onLogout }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo à gauche */}
        <div className="navbar-left">
          <h1 className="navbar-logo">TXL<span>FORMA</span></h1>
        </div>

        {/* Liens de navigation centrés */}
        <div className="navbar-center">
          <Link 
            to="/dashboard/home"
            className={`nav-link ${currentPath === "/dashboard/home" ? "active" : ""}`}
          >
            Accueil
          </Link>
          <Link 
            to="/dashboard/catalogue"
            className={`nav-link ${currentPath === "/dashboard/catalogue" ? "active" : ""}`}
          >
            Catalogue
          </Link>
          <Link 
            to="/dashboard/mes-formations"
            className={`nav-link ${currentPath === "/dashboard/mes-formations" ? "active" : ""}`}
          >
            Mes formations
          </Link>
          <Link 
            to="/dashboard/profil"
            className={`nav-link ${currentPath === "/dashboard/profil" ? "active" : ""}`}
          >
            Profil
          </Link>
        </div>

        {/* Bouton de déconnexion à droite */}
        <div className="navbar-right">
          <button className="logout-btn" onClick={onLogout}>
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}