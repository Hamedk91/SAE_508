package mmi.sae_back.Controller;

import mmi.sae_back.Entity.Note;
import mmi.sae_back.Entity.Inscription;
import mmi.sae_back.Repository.NoteRepository;
import mmi.sae_back.Repository.InscriptionRepository;
import mmi.sae_back.Service.InscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inscriptions")
@CrossOrigin(origins = "http://localhost:3000")
public class InscriptionController {

    private final InscriptionService inscriptionService;
    private final NoteRepository noteRepository;
    private final InscriptionRepository inscriptionRepository;

    @Autowired
    public InscriptionController(InscriptionService inscriptionService,
                                 NoteRepository noteRepository,
                                 InscriptionRepository inscriptionRepository) {
        this.inscriptionService = inscriptionService;
        this.noteRepository = noteRepository;
        this.inscriptionRepository = inscriptionRepository;
    }

    // ------------------- EXISTANT -------------------
    @PostMapping
    public ResponseEntity<String> inscrireParticipant(@RequestBody InscriptionRequest request) {
        try {
            inscriptionService.inscrire(request.getParticipantId(), request.getSessionId());
            return ResponseEntity.ok("Inscription réussie !");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{participantId}/{sessionId}")
    public ResponseEntity<?> desinscrire(@PathVariable Long participantId, @PathVariable Long sessionId) {
        try {
            inscriptionService.desinscrire(participantId, sessionId);
            return ResponseEntity.ok("Désinscription réussie");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    public static class InscriptionRequest {
        private Long participantId;
        private Long sessionId;

        public Long getParticipantId() { return participantId; }
        public void setParticipantId(Long participantId) { this.participantId = participantId; }

        public Long getSessionId() { return sessionId; }
        public void setSessionId(Long sessionId) { this.sessionId = sessionId; }
    }

    // ------------------- AJOUT NOTES -------------------

    // GET notes pour une inscription
    @GetMapping("/{inscriptionId}/notes")
    public ResponseEntity<List<Note>> getNotes(@PathVariable Long inscriptionId) {
        List<Note> notes = noteRepository.findByInscription_Id(inscriptionId);
        return ResponseEntity.ok(notes);
    }

    // POST nouvelle note
    @PostMapping("/{inscriptionId}/notes")
    public ResponseEntity<Note> addNote(@PathVariable Long inscriptionId, @RequestBody Note note) {
        Inscription inscription = inscriptionRepository.findById(inscriptionId)
                .orElseThrow(() -> new RuntimeException("Inscription introuvable"));
        note.setInscription(inscription);
        Note savedNote = noteRepository.save(note);
        return ResponseEntity.ok(savedNote);
    }

    // PUT modifier note
    @PutMapping("/notes/{noteId}")
    public ResponseEntity<Note> updateNote(@PathVariable Long noteId, @RequestBody Note updatedNote) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note introuvable"));
        note.setNom(updatedNote.getNom());
        note.setValeur(updatedNote.getValeur());
        note.setCoefficient(updatedNote.getCoefficient());
        Note savedNote = noteRepository.save(note);
        return ResponseEntity.ok(savedNote);
    }

    // DELETE note
    @DeleteMapping("/notes/{noteId}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long noteId) {
        if (!noteRepository.existsById(noteId)) {
            return ResponseEntity.notFound().build();
        }
        noteRepository.deleteById(noteId);
        return ResponseEntity.noContent().build();
    }
}
