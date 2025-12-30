import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./Pages/Login";
import UtilisateurDashboard from "./Pages/utlisateur/UtilisateurDashboard";
import PaymentSuccess from "./Pages/utlisateur/PaymentSucess";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import FormateurDashboard from "./Pages/Formateur/FormateurDashboard";

import "./css/global.css";

/* ===== App ===== */
function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role) {
      setUserRole(user.role.toUpperCase());
    }
  }, []);

  const handleLogin = (role) => {
    setUserRole(role.toUpperCase());
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUserRole(null);
  };

  return (
    <Router>
      <Routes>
        {/* ===== LOGIN ===== */}
        <Route
          path="/"
          element={
            userRole ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* ===== DASHBOARD PRINCIPAL ===== */}
        <Route
          path="/dashboard"
          element={
            !userRole ? (
              <Navigate to="/" />
            ) : userRole === "ADMIN" ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : userRole === "FORMATEUR" ? (
              <FormateurDashboard
                onLogout={handleLogout}
                formateurId={JSON.parse(localStorage.getItem("user"))?.id}
              />
            ) : (
              <Navigate to="/dashboard/home" />
            )
          }
        />

        {/* ===== ROUTES UTILISATEUR ===== */}
        <Route
          path="/dashboard/*"
          element={
            !userRole ? (
              <Navigate to="/" />
            ) : (
              <DashboardRoutes onLogout={handleLogout} />
            )
          }
        />

        {/* ===== STRIPE ===== */}
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

/* ===== ROUTES UTILISATEUR ===== */
function DashboardRoutes({ onLogout }) {
  return (
    <Routes>
      <Route
        path="home"
        element={<UtilisateurDashboard onLogout={onLogout} defaultView="home" />}
      />
      <Route
        path="catalogue"
        element={
          <UtilisateurDashboard onLogout={onLogout} defaultView="catalogue" />
        }
      />
      <Route
        path="mes-formations"
        element={
          <UtilisateurDashboard
            onLogout={onLogout}
            defaultView="mes-formations"
          />
        }
      />
      <Route
        path="profil"
        element={
          <UtilisateurDashboard onLogout={onLogout} defaultView="profil" />
        }
      />
      <Route path="*" element={<Navigate to="home" />} />
    </Routes>
  );
}

export default App;
