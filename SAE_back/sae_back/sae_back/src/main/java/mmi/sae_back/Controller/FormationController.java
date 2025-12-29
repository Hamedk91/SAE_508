package mmi.sae_back.Controller;

import mmi.sae_back.Entity.Formation;
import mmi.sae_back.Repository.FormationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/formations")
@CrossOrigin(origins = "http://localhost:3000")
public class FormationController {

    private final FormationRepository formationRepository;

    public FormationController(FormationRepository formationRepository) {
        this.formationRepository = formationRepository;
    }

    // 🔹 Toutes les formations
    @GetMapping
    public List<Formation> getAllFormations() {
        return formationRepository.findAll();
    }

    // 🔹 Formations par catégorie
    @GetMapping("/categorie/{id}")
    public List<Formation> getFormationsByCategorie(@PathVariable Long id) {
        return formationRepository.findByCategorie_Id(id);
    }
}
