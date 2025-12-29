package mmi.sae_back.Controller;

import mmi.sae_back.Service.InscriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inscriptions")
@CrossOrigin(origins = "http://localhost:3000")
public class InscriptionController {

    private final InscriptionService inscriptionService;

    public InscriptionController(InscriptionService inscriptionService) {
        this.inscriptionService = inscriptionService;
    }

    @PostMapping
    public ResponseEntity<String> inscrireParticipant(@RequestBody InscriptionRequest request) {
        try {
            inscriptionService.inscrire(request.getParticipantId(), request.getSessionId());
            return ResponseEntity.ok("Inscription réussie !");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // ✅ Correction ici : supprime "inscriptions" du path
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
}
