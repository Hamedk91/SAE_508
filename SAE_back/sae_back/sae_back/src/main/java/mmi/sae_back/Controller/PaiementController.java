package mmi.sae_back.Controller;

import com.stripe.model.checkout.Session;
import mmi.sae_back.Service.PaiementService;
import mmi.sae_back.Config.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/paiement")
@CrossOrigin(origins = "http://localhost:3000")
public class PaiementController {

    private final PaiementService paiementService;
    private final JwtUtil jwtUtil;

    public PaiementController(PaiementService paiementService, JwtUtil jwtUtil) {
        this.paiementService = paiementService;
        this.jwtUtil = jwtUtil;
    }

    /** Création session Stripe */
    @PostMapping("/session")
    public ResponseEntity<Map<String, String>> creerSession(
            @RequestHeader("Authorization") String auth,
            @RequestBody PaiementRequest request) {

        if (auth == null || !auth.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Token manquant"));
        }

        Long participantId = jwtUtil.getUserId(auth.replace("Bearer ", ""));

        try {
            String urlStripe = paiementService.creerSessionStripe(
                    participantId,
                    request.getSessionId()
            );
            return ResponseEntity.ok(Map.of("url", urlStripe));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    /** Webhook Stripe */
    @PostMapping("/webhook")
    public ResponseEntity<String> webhookStripe(@RequestBody Map<String, Object> payload) {
        try {
            Map<String, Object> data = (Map<String, Object>) payload.get("data");
            Map<String, Object> object = (Map<String, Object>) data.get("object");
            Map<String, Object> metadata = (Map<String, Object>) object.get("metadata");

            paiementService.validerPaiementEtInscrire((String) object.get("id"), metadata);

            return ResponseEntity.ok("Paiement validé et inscription créée !");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("Erreur webhook: " + e.getMessage());
        }
    }

    /** DTO  */
    public static class PaiementRequest {
        private Long sessionId;

        public Long getSessionId() { return sessionId; }
        public void setSessionId(Long sessionId) { this.sessionId = sessionId; }
    }
}
