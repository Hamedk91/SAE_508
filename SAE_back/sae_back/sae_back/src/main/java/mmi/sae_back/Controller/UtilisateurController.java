package mmi.sae_back.Controller;

import mmi.sae_back.Entity.Utilisateur;
import mmi.sae_back.Repository.UtilisateurRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "http://localhost:3000")
public class UtilisateurController {

    private final UtilisateurRepository utilisateurRepository;

    // Constructeur
    public UtilisateurController(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    // Récupérer le profil d'un utilisateur par son ID
    @GetMapping("/{id}")
    public Utilisateur getProfil(@PathVariable Long id) {
        return utilisateurRepository.findById(id).orElseThrow();
    }
}
