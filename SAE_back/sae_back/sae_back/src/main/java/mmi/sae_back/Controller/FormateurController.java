package mmi.sae_back.Controller;

import mmi.sae_back.Entity.Formateur;
import mmi.sae_back.Repository.FormateurRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class FormateurController {

    private final FormateurRepository formateurRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public FormateurController(FormateurRepository formateurRepository) {
        this.formateurRepository = formateurRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
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
        // Mot de passe par défaut = "12345" hashé
        f.setMotDePasse(passwordEncoder.encode("12345"));
        f.setRole("FORMATEUR");
        f.setDateInscription(LocalDate.now());
        return formateurRepository.save(f);
    }

    @PutMapping("/formateurs/{id}")
    public Formateur updateFormateur(@PathVariable Long id, @RequestBody Formateur f) {
        Formateur existing = formateurRepository.findById(id).orElseThrow();
        existing.setNom(f.getNom());
        existing.setPrenom(f.getPrenom());
        existing.setEmail(f.getEmail());
        // On ne modifie pas le mot de passe par défaut ici
        return formateurRepository.save(existing);
    }

    @DeleteMapping("/formateurs/{id}")
    public void deleteFormateur(@PathVariable Long id) {
        formateurRepository.deleteById(id);
    }
}
