package mmi.sae_back.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "dtype")
@DiscriminatorValue("UTILISATEUR")
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String role;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private LocalDate dateInscription;
}
