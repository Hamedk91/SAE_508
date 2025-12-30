package mmi.sae_back.Controller;



import mmi.sae_back.Entity.Inscription;
import mmi.sae_back.Entity.SessionFormation;
import mmi.sae_back.Repository.InscriptionRepository;
import mmi.sae_back.Repository.SessionFormationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/formateur")
@CrossOrigin(origins = "http://localhost:3000")
public class FormateurDashboardController {

    private final SessionFormationRepository sessionRepo;
    private final InscriptionRepository inscriptionRepo;

    public FormateurDashboardController(
            SessionFormationRepository sessionRepo,
            InscriptionRepository inscriptionRepo
    ) {
        this.sessionRepo = sessionRepo;
        this.inscriptionRepo = inscriptionRepo;
    }

    // ✅ 1. Sessions d’un formateur (via son ID)
    @GetMapping("/{formateurId}/sessions")
    public List<SessionFormation> sessionsDuFormateur(
            @PathVariable Long formateurId
    ) {
        return sessionRepo.findByFormateur_Id(formateurId);
    }

    // ✅ 2. Élèves d’une session
    @GetMapping("/sessions/{sessionId}/eleves")
    public List<Inscription> elevesSession(
            @PathVariable Long sessionId
    ) {
        return inscriptionRepo.findBySession_Id(sessionId);
    }

    // ✅ 3. Ajouter / modifier une note pour un élève
    @PutMapping("/inscriptions/{inscriptionId}/note")
    public Inscription noterEleve(
            @PathVariable Long inscriptionId,
            @RequestBody Double note
    ) {
        Inscription inscription = inscriptionRepo
                .findById(inscriptionId)
                .orElseThrow(() -> new RuntimeException("Inscription introuvable"));

        inscription.setNote(note);
        return inscriptionRepo.save(inscription);
    }
}
