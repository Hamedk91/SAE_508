import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./Pages/Login";
import UtilisateurDashboard from "./Pages/utlisateur/UtilisateurDashboard";
import SessionNotes from "./Pages/utlisateur/SessionNotes";
import PaymentSuccess from "./Pages/utlisateur/PaymentSucess";
import AdminDashboard from "./Pages/admin/AdminDashboard";
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
            userRole ? <Navigate to="/dashboard/home" /> : <Login onLogin={handleLogin} />
          }
        />

        {/* ===== DASHBOARD PRINCIPAL ===== */}
        <Route
          path="/dashboard/*"
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
              <UtilisateurDashboard onLogout={handleLogout} />
            )
          }
        />

        {/* ===== PAGE SESSION NOTES (hors dashboard) ===== */}
        <Route
          path="/session-notes/:sessionId"
          element={
            !userRole ? (
              <Navigate to="/" />
            ) : (
              <SessionNotes />
            )
          }
        />

        {/* ===== STRIPE SUCCESS ===== */}
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
