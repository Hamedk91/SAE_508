package mmi.sae_back.Controller;

import mmi.sae_back.Entity.Utilisateur;
import mmi.sae_back.Repository.UtilisateurRepository;
import mmi.sae_back.Config.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final UtilisateurRepository utilisateurRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    public AdminController(UtilisateurRepository utilisateurRepository, JwtUtil jwtUtil) {
        this.utilisateurRepository = utilisateurRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // 🔹 Récupère uniquement les utilisateurs avec le rôle "UTILISATEUR"
    @GetMapping("/utilisateurs")
    public List<Utilisateur> getUtilisateurs() {
        return utilisateurRepository.findByRole("UTILISATEUR");
    }

    // 🔹 Ajouter un utilisateur avec mot de passe hashé et rôle "UTILISATEUR"
    @PostMapping("/utilisateurs")
    public Utilisateur addUtilisateur(@RequestBody Utilisateur u) {
        u.setRole("UTILISATEUR"); // rôle forcé
        u.setMotDePasse(passwordEncoder.encode("12345")); // mot de passe par défaut hashé
        u.setDateInscription(LocalDate.now());
        return utilisateurRepository.save(u);
    }

    // 🔹 Mettre à jour un utilisateur (sans toucher au mot de passe par défaut)
    @PutMapping("/utilisateurs/{id}")
    public Utilisateur updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur u) {
        Utilisateur existing = utilisateurRepository.findById(id).orElseThrow();
        existing.setNom(u.getNom());
        existing.setPrenom(u.getPrenom());
        existing.setEmail(u.getEmail());
        // rôle reste "UTILISATEUR"
        existing.setRole("UTILISATEUR");
        return utilisateurRepository.save(existing);
    }

    // 🔹 Supprimer un utilisateur
    @DeleteMapping("/utilisateurs/{id}")
    public void deleteUtilisateur(@PathVariable Long id) {
        utilisateurRepository.deleteById(id);
    }
}
