package mmi.sae_back.Entity;

import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
public class Formateur extends Utilisateur {
    // Pas de champs supplémentaires pour l’instant
    // Les méthodes spécifiques (évaluer participants, saisir notes) seront dans le service ou controller
}
