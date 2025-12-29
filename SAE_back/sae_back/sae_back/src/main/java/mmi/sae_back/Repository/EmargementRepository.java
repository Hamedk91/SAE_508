package mmi.sae_back.Repository;



import mmi.sae_back.Entity.Emargement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmargementRepository extends JpaRepository<Emargement, Long> {
}

