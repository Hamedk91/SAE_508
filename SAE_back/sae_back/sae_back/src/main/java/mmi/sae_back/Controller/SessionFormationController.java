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

    // 🔹 Sessions pour une formation
    @GetMapping("/formation/{formationId}")
    public List<SessionFormation> getSessionsByFormation(@PathVariable Long formationId) {
        return sessionRepository.findAllByFormation_Id(formationId);
    }

    // 🔹 Ajouter une session
    @PostMapping
    public SessionFormation addSession(@RequestBody SessionFormation s) {
        // Spring Boot convertira correctement les dates ISO et les Integer
        return sessionRepository.save(s);
    }

    // 🔹 Modifier une session
    @PutMapping("/{id}")
    public SessionFormation updateSession(@PathVariable Long id, @RequestBody SessionFormation s) {
        SessionFormation existing = sessionRepository.findById(id).orElseThrow();
        existing.setLieu(s.getLieu());
        existing.setDateDebut(s.getDateDebut());
        existing.setDateFin(s.getDateFin());
        existing.setPlacesMax(s.getPlacesMax());
        existing.setPlacesRestantes(s.getPlacesRestantes());
        existing.setStatut(s.getStatut());
        existing.setFormation(s.getFormation());
        return sessionRepository.save(existing);
    }

    // 🔹 Supprimer une session
    @DeleteMapping("/{id}")
    public void deleteSession(@PathVariable Long id) {
        sessionRepository.deleteById(id);
    }
}
