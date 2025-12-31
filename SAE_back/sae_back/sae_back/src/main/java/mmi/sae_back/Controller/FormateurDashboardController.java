package mmi.sae_back.Controller;

import mmi.sae_back.Entity.Inscription;
import mmi.sae_back.Entity.Note;
import mmi.sae_back.Entity.SessionFormation;
import mmi.sae_back.Repository.InscriptionRepository;
import mmi.sae_back.Repository.NoteRepository;
import mmi.sae_back.Repository.SessionFormationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/formateur")
@CrossOrigin(origins = "http://localhost:3000")
public class FormateurDashboardController {

    private final SessionFormationRepository sessionRepo;
    private final InscriptionRepository inscriptionRepo;
    private final NoteRepository noteRepo;

    public FormateurDashboardController(
            SessionFormationRepository sessionRepo,
            InscriptionRepository inscriptionRepo,
            NoteRepository noteRepo
    ) {
        this.sessionRepo = sessionRepo;
        this.inscriptionRepo = inscriptionRepo;
        this.noteRepo = noteRepo;
    }

    // 1️⃣ Sessions du formateur
    @GetMapping("/{formateurId}/sessions")
    public List<SessionFormation> sessionsDuFormateur(
            @PathVariable Long formateurId
    ) {
        return sessionRepo.findByFormateur_Id(formateurId);
    }

    // 2️⃣ Élèves d’une session
    @GetMapping("/sessions/{sessionId}/eleves")
    public List<Inscription> elevesSession(
            @PathVariable Long sessionId
    ) {
        return inscriptionRepo.findBySession_Id(sessionId);
    }

    // 3️⃣ Ajouter une note (popup formateur)
    @PostMapping("/inscriptions/{inscriptionId}/notes")
    public Note ajouterNote(
            @PathVariable Long inscriptionId,
            @RequestBody Note note
    ) {
        Inscription inscription = inscriptionRepo.findById(inscriptionId)
                .orElseThrow(() -> new RuntimeException("Inscription introuvable"));

        note.setId(null);
        note.setInscription(inscription);

        return noteRepo.save(note);
    }

    // 4️⃣ Supprimer une note
    @DeleteMapping("/notes/{noteId}")
    public void supprimerNote(@PathVariable Long noteId) {
        noteRepo.deleteById(noteId);
    }
}
