import { useState } from "react";
import "../css/Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, motDePasse }),
      });

      if (!response.ok) {
        const err = await response.json();
        setMessage(err.error || "Email ou mot de passe incorrect");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      onLogin(data.role.toUpperCase());

    } catch (error) {
      setMessage("Erreur de connexion");
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      {/* Section gauche - Bleu avec slogan */}
      <div className="login-left">
        <div className="login-logo">TxL</div>
        <h2 className="login-slogan">
          Formez-vous aujourd'hui aux compétences de demain
        </h2>
      </div>

      {/* Section droite - Formulaire */}
      <div className="login-right">
        <div className="login-form-container">
          <h1 className="login-title">CONNEXION</h1>
          
          <div className="login-form">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Identifiant"
              className="login-input"
            />

            <input
              type="password"
              value={motDePasse}
              onChange={e => setMotDePasse(e.target.value)}
              placeholder="Mot de passe"
              onKeyPress={e => e.key === 'Enter' && login()}
              className="login-input"
            />

            <button onClick={login} className="login-button">
              Connectez-vous
            </button>
          </div>

          {message && <p className="login-message">{message}</p>}

          <p className="login-signup">
            Pas de compte?{" "}
            <span className="login-signup-link">Inscrivez-vous</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;