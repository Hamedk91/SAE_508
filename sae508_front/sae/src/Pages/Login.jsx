import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, motDePasse }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors du login");
        return;
      }

      // Stocker token et user complet
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onLogin(data.user.role);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Erreur serveur");
    }
  };

  return (
    <div className="login-page">
      {/* Section gauche - Bleu avec logo et slogan */}
      <div className="login-left">
        <div className="login-logo">TxL</div>
        <h2 className="login-slogan">
          Formez-vous aujourd'hui aux compétences de demain
        </h2>
      </div>

      {/* Section droite - Formulaire blanc */}
      <div className="login-right">
        <div className="login-form-container">
          <h1 className="login-title">CONNEXION</h1>
          
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              placeholder="Identifiant"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
            
            <input
              type="password"
              placeholder="Mot de passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="login-input"
              required
            />
            
            <button type="submit" className="login-button">
              Connectez-vous
            </button>
            
            {error && <p className="login-error">{error}</p>}
          </form>

          
        </div>
      </div>
    </div>
  );
}