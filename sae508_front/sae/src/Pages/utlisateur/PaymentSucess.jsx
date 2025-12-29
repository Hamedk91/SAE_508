import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionStripeId = searchParams.get("sessionId");

  useEffect(() => {
    // ✅ Stripe a déjà confirmé le paiement via webhook
    // ❌ AUCUN appel backend ici

    if (!sessionStripeId) {
      navigate("/dashboard/mes-formations");
      return;
    }

    console.log("✅ Paiement validé par Stripe :", sessionStripeId);

    const timer = setTimeout(() => {
      navigate("/dashboard/mes-formations");
    }, 3000);

    return () => clearTimeout(timer);
  }, [sessionStripeId, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.successIcon}>✅</div>
        <h1 style={styles.title}>Paiement validé</h1>
        <p style={styles.text}>Merci pour votre paiement !</p>
        <p style={styles.text}>
          Votre inscription à la formation a bien été enregistrée.
        </p>
        <p style={styles.smallText}>
          Redirection vers vos formations dans 3 secondes...
        </p>

        <button
          style={styles.button}
          onClick={() => navigate("/dashboard/mes-formations")}
        >
          Voir mes formations maintenant
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #F8F9FB 0%, #E9ECEF 100%)"
  },
  card: {
    background: "#fff",
    padding: "50px",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0, 74, 173, 0.2)",
    textAlign: "center",
    maxWidth: "500px",
    width: "90%"
  },
  successIcon: {
    fontSize: "60px",
    marginBottom: "20px"
  },
  title: {
    color: "#2ecc71",
    marginBottom: "20px",
    fontSize: "32px",
    fontWeight: "700"
  },
  text: {
    marginBottom: "10px",
    fontSize: "18px",
    color: "#333"
  },
  smallText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#666",
    fontStyle: "italic"
  },
  button: {
    marginTop: "30px",
    padding: "15px 30px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #004AAD 0%, #00AEEF 100%)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    width: "100%"
  }
};
