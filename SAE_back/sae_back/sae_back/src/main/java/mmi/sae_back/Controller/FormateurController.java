package mmi.sae_back.Controller;

import mmi.sae_back.Entity.Formateur;
import mmi.sae_back.Repository.FormateurRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class FormateurController {

    private final FormateurRepository formateurRepository;

    // Injection via constructeur
    public FormateurController(FormateurRepository formateurRepository) {
        this.formateurRepository = formateurRepository;
    }

    @GetMapping("/dashboard")
    public String formateurDashboard() {
        return "Bienvenue FORMATEUR !";
    }

    @GetMapping("/formateurs")
    public List<Formateur> getFormateurs() {
        return formateurRepository.findAll();
    }

    @PostMapping("/formateurs")
    public Formateur addFormateur(@RequestBody Formateur f) {
        return formateurRepository.save(f);
    }

    @PutMapping("/formateurs/{id}")
    public Formateur updateFormateur(@PathVariable Long id, @RequestBody Formateur f) {
        Formateur existing = formateurRepository.findById(id).orElseThrow();
        existing.setNom(f.getNom());
        existing.setPrenom(f.getPrenom());
        existing.setEmail(f.getEmail());
        return formateurRepository.save(existing);
    }

    @DeleteMapping("/formateurs/{id}")
    public void deleteFormateur(@PathVariable Long id) {
        formateurRepository.deleteById(id);
    }
}
