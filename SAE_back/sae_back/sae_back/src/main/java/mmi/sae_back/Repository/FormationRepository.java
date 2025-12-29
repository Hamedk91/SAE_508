package mmi.sae_back.Repository;




import mmi.sae_back.Entity.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormationRepository extends JpaRepository<Formation, Long> {

    // Récupérer toutes les formations d'une catégorie
    List<Formation> findByCategorie_Id(Long categorieId);
}

