package mmi.sae_back.Entity;

import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
public class Participant extends Utilisateur {
    // Pas de champs supplémentaires pour l’instant
    // Méthodes spécifiques (ajouter au panier, payer, émarger) seront dans le service ou controller
}
