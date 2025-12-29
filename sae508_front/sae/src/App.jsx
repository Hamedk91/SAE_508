import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Login from "./Pages/Login";
import UtilisateurDashboard from "./Pages/utlisateur/UtilisateurDashboard";
import PaymentSuccess from "./Pages/utlisateur/PaymentSucess";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import "./css/global.css";

function FormateurDashboard({ onLogout }) {
  return (
    <div>
      <h2>Bienvenue Formateur</h2>
      <button onClick={onLogout}>Déconnexion</button>
    </div>
  );
}

/* ===== App ===== */
function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role) setUserRole(user.role.toUpperCase());
  }, []);

  const handleLogin = (role) => setUserRole(role.toUpperCase());
  const handleLogout = () => { 
    localStorage.removeItem("user"); 
    localStorage.removeItem("token"); 
    setUserRole(null); 
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={userRole ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={
          !userRole ? <Navigate to="/" /> :
          userRole === "ADMIN" ? <AdminDashboard onLogout={handleLogout} /> :
          userRole === "FORMATEUR" ? <FormateurDashboard onLogout={handleLogout} /> :
          <Navigate to="/dashboard/home" />
        }/>
        <Route path="/dashboard/*" element={
          !userRole ? <Navigate to="/" /> :
          <DashboardRoutes onLogout={handleLogout} />
        }/>
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

// Composant pour gérer les routes du tableau de bord
function DashboardRoutes({ onLogout }) {
  return (
    <Routes>
      <Route path="home" element={<UtilisateurDashboard onLogout={onLogout} defaultView="home" />} />
      <Route path="catalogue" element={<UtilisateurDashboard onLogout={onLogout} defaultView="catalogue" />} />
      <Route path="mes-formations" element={<UtilisateurDashboard onLogout={onLogout} defaultView="mes-formations" />} />
      <Route path="profil" element={<UtilisateurDashboard onLogout={onLogout} defaultView="profil" />} />
      <Route path="*" element={<Navigate to="home" />} />
    </Routes>
  );
}

export default App;