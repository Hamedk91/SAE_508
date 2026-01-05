package mmi.sae_back.Entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
@DiscriminatorValue("ADMIN")
public class Administrateur extends Utilisateur {
    // Pas de champs supplémentaires
    // Toutes les méthodes spécifiques seront dans le service ou le contrôleur
}
