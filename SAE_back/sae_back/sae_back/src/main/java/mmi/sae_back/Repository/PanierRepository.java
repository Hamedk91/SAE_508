package mmi.sae_back.Repository;

import mmi.sae_back.Entity.Panier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PanierRepository extends JpaRepository<Panier, Long> {

    Optional<Panier> findByParticipant_Id(Long participantId);
}
