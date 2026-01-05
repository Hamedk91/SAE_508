package mmi.sae_back.Controller;

import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import mmi.sae_back.Service.PaiementService;
import mmi.sae_back.Config.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/paiement")
@CrossOrigin(origins = "http://localhost:3000")
public class PaiementController {

    private final PaiementService paiementService;
    private final JwtUtil jwtUtil;

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    public PaiementController(PaiementService paiementService, JwtUtil jwtUtil) {
        this.paiementService = paiementService;
        this.jwtUtil = jwtUtil;
    }

    /* ===================== CRÉER UNE SESSION STRIPE ===================== */
    @PostMapping("/session")
    public ResponseEntity<Map<String, String>> creerSession(
            @RequestHeader("Authorization") String auth,
            @RequestBody PaiementRequest request
    ) {
        if (auth == null || !auth.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Token manquant"));
        }

        Long participantId = jwtUtil.getUserId(auth.replace("Bearer ", ""));
        try {
            String url = paiementService.creerSessionStripe(participantId, request.getSessionId());
            return ResponseEntity.ok(Map.of("url", url));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    /* ===================== WEBHOOK STRIPE ===================== */
    @PostMapping("/webhook")
    public ResponseEntity<String> webhookStripe(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader
    ) {
        try {
            Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);

            if ("checkout.session.completed".equals(event.getType())) {

                // Récupère l'objet Stripe brut
                StripeObject stripeObject = event.getData().getObject();

                // Si c'est une session de checkout
                if (stripeObject instanceof Session) {
                    Session session = (Session) stripeObject;
                    Map<String, String> metadata = session.getMetadata();

                    Long participantId = Long.valueOf(metadata.get("participantId"));
                    Long sessionId = Long.valueOf(metadata.get("sessionId"));

                    paiementService.validerPaiementEtInscrire(participantId, sessionId);

                    System.out.println("✅ Paiement traité pour participant=" + participantId + " session=" + sessionId);
                } else {
                    System.err.println("⚠ Objet Stripe non reconnu : " + stripeObject.getClass().getSimpleName());
                }
            }

            return ResponseEntity.ok("Webhook traité");

        } catch (SignatureVerificationException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("Signature Stripe invalide");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur webhook");
        }
    }

    /* ===================== DTO ===================== */
    public static class PaiementRequest {
        private Long sessionId;

        public Long getSessionId() { return sessionId; }
        public void setSessionId(Long sessionId) { this.sessionId = sessionId; }
    }
}
