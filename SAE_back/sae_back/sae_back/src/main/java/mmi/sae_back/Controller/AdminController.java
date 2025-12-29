package mmi.sae_back.Controller;

import mmi.sae_back.Entity.Formateur;
import mmi.sae_back.Entity.Formation;
import mmi.sae_back.Entity.Utilisateur;
import mmi.sae_back.Repository.FormateurRepository;
import mmi.sae_back.Repository.FormationRepository;
import mmi.sae_back.Repository.UtilisateurRepository;
import mmi.sae_back.Config.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final FormateurRepository formateurRepository;
    private final FormationRepository formationRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final JwtUtil jwtUtil;

    public AdminController(FormateurRepository formateurRepository,
                           FormationRepository formationRepository,
                           UtilisateurRepository utilisateurRepository,
                           JwtUtil jwtUtil) {
        this.formateurRepository = formateurRepository;
        this.formationRepository = formationRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.jwtUtil = jwtUtil;
    }

    // ====================== FORMATEURS ======================
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

    // ====================== FORMATIONS ======================
    @GetMapping("/formations")
    public List<Formation> getFormations() {
        return formationRepository.findAll();
    }

    @PostMapping("/formations")
    public Formation addFormation(@RequestBody Formation f) {
        return formationRepository.save(f);
    }

    @PutMapping("/formations/{id}")
    public Formation updateFormation(@PathVariable Long id, @RequestBody Formation f) {
        Formation existing = formationRepository.findById(id).orElseThrow();
        existing.setTitre(f.getTitre());
        existing.setDescription(f.getDescription());
        existing.setDuree(f.getDuree());
        existing.setPrix(f.getPrix());
        return formationRepository.save(existing);
    }

    @DeleteMapping("/formations/{id}")
    public void deleteFormation(@PathVariable Long id) {
        formationRepository.deleteById(id);
    }

    // ====================== UTILISATEURS ======================
    @GetMapping("/utilisateurs")
    public List<Utilisateur> getUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @PostMapping("/utilisateurs")
    public Utilisateur addUtilisateur(@RequestBody Utilisateur u) {
        return utilisateurRepository.save(u);
    }

    @PutMapping("/utilisateurs/{id}")
    public Utilisateur updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur u) {
        Utilisateur existing = utilisateurRepository.findById(id).orElseThrow();
        existing.setNom(u.getNom());
        existing.setPrenom(u.getPrenom());
        existing.setEmail(u.getEmail());
        existing.setRole(u.getRole());
        return utilisateurRepository.save(existing);
    }

    @DeleteMapping("/utilisateurs/{id}")
    public void deleteUtilisateur(@PathVariable Long id) {
        utilisateurRepository.deleteById(id);
    }
}
