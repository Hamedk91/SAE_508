package mmi.sae_back.Service;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import mmi.sae_back.Entity.Inscription;
import mmi.sae_back.Entity.SessionFormation;
import mmi.sae_back.Entity.Utilisateur;
import mmi.sae_back.Repository.InscriptionRepository;
import mmi.sae_back.Repository.SessionFormationRepository;
import mmi.sae_back.Repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class PaiementService {

    private final UtilisateurRepository utilisateurRepository;
    private final SessionFormationRepository sessionRepository;
    private final InscriptionRepository inscriptionRepository;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    public PaiementService(
            UtilisateurRepository utilisateurRepository,
            SessionFormationRepository sessionRepository,
            InscriptionRepository inscriptionRepository
    ) {
        this.utilisateurRepository = utilisateurRepository;
        this.sessionRepository = sessionRepository;
        this.inscriptionRepository = inscriptionRepository;
    }

    /* ===================== CRÉER SESSION STRIPE ===================== */
    public String creerSessionStripe(Long participantId, Long sessionId) throws Exception {

        Stripe.apiKey = stripeApiKey;

        SessionFormation sessionFormation = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));

        BigDecimal prix = sessionFormation.getFormation().getPrix();
        long montant = prix.multiply(BigDecimal.valueOf(100)).longValue(); // centimes

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/payment-success?sessionId={CHECKOUT_SESSION_ID}")
                .setCancelUrl("http://localhost:3000/dashboard")
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("eur")
                                                .setUnitAmount(montant)
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName(sessionFormation.getFormation().getTitre())
                                                                .build()
                                                )
                                                .build()
                                )
                                .build()
                )
                .putMetadata("participantId", participantId.toString())
                .putMetadata("sessionId", sessionId.toString())
                .build();

        Session stripeSession = Session.create(params);
        return stripeSession.getUrl();
    }

    /* ===================== VALIDER PAIEMENT ET INSCRIPTION ===================== */
    public void validerPaiementEtInscrire(Long participantId, Long sessionId) {

        Utilisateur participant = utilisateurRepository.findById(participantId)
                .orElseThrow(() -> new RuntimeException("Participant introuvable"));

        SessionFormation session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));

        // Vérifie si l'utilisateur est déjà inscrit
        boolean dejaInscrit = inscriptionRepository
                .findByParticipant_IdAndSession_Id(participantId, sessionId)
                .isPresent();

        if (dejaInscrit) {
            System.out.println("⚠ Participant déjà inscrit : " + participantId);
            return;
        }

        // Crée l'inscription
        Inscription inscription = new Inscription();
        inscription.setParticipant(participant);
        inscription.setSession(session);

        inscriptionRepository.save(inscription);

        // Met à jour les places restantes
        session.setPlacesRestantes(session.getPlacesRestantes() - 1);
        sessionRepository.save(session);

        System.out.println("✅ Inscription créée après paiement : user=" + participantId + ", session=" + sessionId);
    }
}
