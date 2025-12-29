package mmi.sae_back.Service;

import mmi.sae_back.Entity.Utilisateur;
import mmi.sae_back.Repository.UtilisateurRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UtilisateurService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // Crée un utilisateur avec mot de passe hashé
    public Utilisateur createUtilisateur(Utilisateur u) {
        if (u.getMotDePasse() == null || u.getMotDePasse().isEmpty()) {
            throw new IllegalArgumentException("Le mot de passe ne peut pas être vide");
        }
        u.setMotDePasse(passwordEncoder.encode(u.getMotDePasse()));
        return utilisateurRepository.save(u);
    }

    // Login sécurisé
    public Optional<Utilisateur> login(String email, String motDePasse) {
        if (email == null || motDePasse == null) return Optional.empty();

        return utilisateurRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(motDePasse, user.getMotDePasse()));
    }
}
