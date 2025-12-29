package mmi.sae_back.Repository;

import mmi.sae_back.Entity.SessionFormation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionFormationRepository extends JpaRepository<SessionFormation, Long> {

    List<SessionFormation> findAllByFormation_Id(Long formationId);
}
