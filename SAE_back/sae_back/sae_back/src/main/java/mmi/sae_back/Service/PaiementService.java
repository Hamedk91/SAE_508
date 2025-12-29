package mmi.sae_back.Service;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import mmi.sae_back.Entity.SessionFormation;
import mmi.sae_back.Service.InscriptionService;
import mmi.sae_back.Repository.SessionFormationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PaiementService {

    private final InscriptionService inscriptionService;
    private final SessionFormationRepository sessionFormationRepository;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    public PaiementService(InscriptionService inscriptionService,
                           SessionFormationRepository sessionFormationRepository) {
        this.inscriptionService = inscriptionService;
        this.sessionFormationRepository = sessionFormationRepository;
    }

    /** Création session Stripe */
    public String creerSessionStripe(Long participantId, Long sessionId) throws Exception {
        if (stripeApiKey == null || stripeApiKey.isEmpty())
            throw new RuntimeException("Clé Stripe manquante");

        SessionFormation sessionFormation = sessionFormationRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));

        double montant = sessionFormation.getFormation().getPrix().doubleValue();
        if (montant <= 0) throw new RuntimeException("Montant invalide");

        Stripe.apiKey = stripeApiKey;

        Map<String, Object> priceData = Map.of(
                "currency", "eur",
                "unit_amount", (long) (montant * 100),
                "product_data", Map.of("name", sessionFormation.getFormation().getTitre())
        );

        Map<String, Object> lineItem = Map.of(
                "price_data", priceData,
                "quantity", 1
        );

        Map<String, Object> params = Map.of(
                "mode", "payment",
                "line_items", List.of(lineItem),
                "success_url", "http://localhost:3000/payment-success?sessionId={CHECKOUT_SESSION_ID}",
                "cancel_url", "http://localhost:3000/dashboard",
                "metadata", Map.of(
                        "participantId", participantId.toString(),
                        "sessionId", sessionId.toString()
                )
        );

        Session session = Session.create(params);
        return session.getUrl();
    }

    /** Validation après paiement via webhook Stripe */
    public void validerPaiementEtInscrire(String sessionIdStripe, Map<String, Object> metadata) {
        try {
            Long participantId = Long.valueOf((String) metadata.get("participantId"));
            Long sessionId = Long.valueOf((String) metadata.get("sessionId"));
            inscriptionService.inscrire(participantId, sessionId);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de l'inscription : " + e.getMessage());
        }
    }
}
