package mmi.sae_back.Controller;

import mmi.sae_back.Entity.Note;
import mmi.sae_back.Entity.Inscription;
import mmi.sae_back.Repository.NoteRepository;
import mmi.sae_back.Repository.InscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:3000") // CORS pour React
public class NoteController {

    private final NoteRepository noteRepository;
    private final InscriptionRepository inscriptionRepository;

    @Autowired
    public NoteController(NoteRepository noteRepository, InscriptionRepository inscriptionRepository) {
        this.noteRepository = noteRepository;
        this.inscriptionRepository = inscriptionRepository;
    }

    // ✅ GET toutes les notes pour une inscription
    @GetMapping("/inscription/{inscriptionId}")
    public ResponseEntity<List<Note>> getNotesByInscription(@PathVariable Long inscriptionId) {
        List<Note> notes = noteRepository.findByInscription_Id(inscriptionId);
        return ResponseEntity.ok(notes);
    }

    // ✅ POST : ajouter une note à une inscription
    @PostMapping("/inscription/{inscriptionId}")
    public ResponseEntity<Note> addNote(@PathVariable Long inscriptionId, @RequestBody Note note) {
        Inscription inscription = inscriptionRepository.findById(inscriptionId)
                .orElseThrow(() -> new RuntimeException("Inscription introuvable"));
        note.setInscription(inscription);
        Note savedNote = noteRepository.save(note);
        return ResponseEntity.ok(savedNote);
    }

    // ✅ PUT : modifier une note existante
    @PutMapping("/{noteId}")
    public ResponseEntity<Note> updateNote(@PathVariable Long noteId, @RequestBody Note updatedNote) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note introuvable"));
        note.setNom(updatedNote.getNom());
        note.setValeur(updatedNote.getValeur());
        note.setCoefficient(updatedNote.getCoefficient());
        Note savedNote = noteRepository.save(note);
        return ResponseEntity.ok(savedNote);
    }

    // ✅ DELETE : supprimer une note
    @DeleteMapping("/{noteId}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long noteId) {
        if (!noteRepository.existsById(noteId)) {
            return ResponseEntity.notFound().build();
        }
        noteRepository.deleteById(noteId);
        return ResponseEntity.noContent().build();
    }
}
