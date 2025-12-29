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

    // ✅ Sessions pour une formation
    @GetMapping("/formation/{formationId}")
    public List<SessionFormation> getSessionsByFormation(@PathVariable Long formationId) {
        return sessionRepository.findAllByFormation_Id(formationId);
    }
}
