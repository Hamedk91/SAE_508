package mmi.sae_back.Repository;

import mmi.sae_back.Entity.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InscriptionRepository extends JpaRepository<Inscription, Long> {

    // Toutes les inscriptions d'un participant
    List<Inscription> findByParticipant_Id(Long participantId);

    // Une inscription spécifique d'un participant pour une session
    Optional<Inscription> findByParticipant_IdAndSession_Id(Long participantId, Long sessionId);
}
