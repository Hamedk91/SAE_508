package mmi.sae_back.Repository;


import mmi.sae_back.Entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByInscription_Id(Long inscriptionId);
}
