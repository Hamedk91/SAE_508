package mmi.sae_back.Controller;

import mmi.sae_back.Entity.SessionFormation;
import mmi.sae_back.Repository.SessionFormationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "http://localhost:3000")
public class SessionFormationController {

    private final SessionFormationRepository sessionRepository;

    public SessionFormationController(SessionFormationRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    // 🔹 Récupérer toutes les sessions pour une formation
    @GetMapping("/formation/{formationId}")
    public List<SessionFormation> getSessionsByFormation(@PathVariable Long formationId) {
        return sessionRepository.findAllByFormation_Id(formationId);
    }

    // 🔹 Ajouter une session
    @PostMapping
    public SessionFormation addSession(@RequestBody SessionFormation session) {
        // Spring Boot convertira automatiquement les dates ISO
        return sessionRepository.save(session);
    }

    // 🔹 Modifier une session
    @PutMapping("/{id}")
    public SessionFormation updateSession(@PathVariable Long id, @RequestBody SessionFormation session) {
        SessionFormation existing = sessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session non trouvée avec id " + id));

        existing.setLieu(session.getLieu());
        existing.setDateDebut(session.getDateDebut());
        existing.setDateFin(session.getDateFin());
        existing.setPlacesMax(session.getPlacesMax());
        existing.setPlacesRestantes(session.getPlacesRestantes());
        existing.setStatut(session.getStatut());
        existing.setFormation(session.getFormation());
        existing.setFormateur(session.getFormateur()); // inclut le formateur

        return sessionRepository.save(existing);
    }

    // 🔹 Supprimer une session
    @DeleteMapping("/{id}")
    public void deleteSession(@PathVariable Long id) {
        sessionRepository.deleteById(id);
    }
}
