package mmi.sae_back.Entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
@DiscriminatorValue("FORMATEUR") // doit correspondre à la valeur que tu as mise dans dtype pour les formateurs
public class Formateur extends Utilisateur {
}

