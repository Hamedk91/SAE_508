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

    // GET : toutes les formations
    @GetMapping
    public List<Formation> getAllFormations() {
        return formationRepository.findAll();
    }

    // GET : formations par catégorie
    @GetMapping("/categorie/{id}")
    public List<Formation> getFormationsByCategorie(@PathVariable Long id) {
        return formationRepository.findByCategorie_Id(id);
    }

    // POST : ajouter une formation
    @PostMapping
    public Formation addFormation(@RequestBody Formation f) {
        return formationRepository.save(f);
    }

    // PUT : modifier une formation
    @PutMapping("/{id}")
    public Formation updateFormation(@PathVariable Long id, @RequestBody Formation f) {
        Formation existing = formationRepository.findById(id).orElseThrow();
        existing.setTitre(f.getTitre());
        existing.setDuree(f.getDuree());
        existing.setPrix(f.getPrix());
        existing.setCategorie(f.getCategorie());
        return formationRepository.save(existing);
    }

    // DELETE : supprimer une formation
    @DeleteMapping("/{id}")
    public void deleteFormation(@PathVariable Long id) {
        formationRepository.deleteById(id);
    }
}
