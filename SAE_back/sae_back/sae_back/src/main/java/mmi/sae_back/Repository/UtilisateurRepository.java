package mmi.sae_back.Repository;

import mmi.sae_back.Entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    Optional<Utilisateur> findByEmail(String email);

    // ✅ Retourne uniquement les utilisateurs avec un rôle spécifique
    List<Utilisateur> findByRole(String role);
}
