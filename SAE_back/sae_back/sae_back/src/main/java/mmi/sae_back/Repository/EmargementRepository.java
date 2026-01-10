package mmi.sae_back.Repository;

import mmi.sae_back.Entity.Emargement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EmargementRepository extends JpaRepository<Emargement, Long> {

    List<Emargement> findByInscription_Session_IdAndDate(Long sessionId, LocalDate date);

    boolean existsByInscription_IdAndDate(Long inscriptionId, LocalDate date);
}
