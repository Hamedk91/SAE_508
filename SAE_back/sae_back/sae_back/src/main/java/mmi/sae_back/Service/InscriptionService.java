package mmi.sae_back.Service;

import mmi.sae_back.Entity.Inscription;
import mmi.sae_back.Entity.SessionFormation;
import mmi.sae_back.Entity.Utilisateur;
import mmi.sae_back.Repository.InscriptionRepository;
import mmi.sae_back.Repository.SessionFormationRepository;
import mmi.sae_back.Repository.UtilisateurRepository;
import org.springframework.stereotype.Service;

@Service
public class InscriptionService {

    private final InscriptionRepository inscriptionRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final SessionFormationRepository sessionRepository;

    public InscriptionService(InscriptionRepository inscriptionRepository,
                              UtilisateurRepository utilisateurRepository,
                              SessionFormationRepository sessionRepository) {
        this.inscriptionRepository = inscriptionRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.sessionRepository = sessionRepository;
    }

    public void inscrire(Long participantId, Long sessionId) {
        Utilisateur participant = utilisateurRepository.findById(participantId)
                .orElseThrow(() -> new RuntimeException("Participant introuvable"));
        SessionFormation session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));

        if (session.getPlacesRestantes() <= 0) throw new RuntimeException("Plus de places disponibles");

        Inscription inscription = new Inscription();
        inscription.setParticipant(participant);
        inscription.setSession(session);
        inscriptionRepository.save(inscription);

        session.setPlacesRestantes(session.getPlacesRestantes() - 1);
        sessionRepository.save(session);
    }

    public void desinscrire(Long participantId, Long sessionId) {
        Inscription inscription = inscriptionRepository
                .findByParticipant_IdAndSession_Id(participantId, sessionId)
                .orElseThrow(() -> new RuntimeException("Inscription non trouvée"));
        inscriptionRepository.delete(inscription);

        SessionFormation session = inscription.getSession();
        session.setPlacesRestantes(session.getPlacesRestantes() + 1);
        sessionRepository.save(session);
    }
}
