package mmi.sae_back.Entity;



import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "session_formation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionFormation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;

    private String lieu;

    private int placesMax;
    private int placesRestantes;

    private String statut;

    // 🔹 Lien vers Formation
    @ManyToOne
    @JoinColumn(name = "formation_id", nullable = false)
    @JsonIgnoreProperties({"sessions", "categorie"})
    private Formation formation;

    // 🔹 Lien vers Formateur
    @ManyToOne
    @JoinColumn(name = "formateur_id", nullable = false)
    @JsonIgnoreProperties({"password", "motDePasse"})
    private Formateur formateur;

    // 🔹 Inscriptions
    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("session")
    private List<Inscription> inscriptions;
}
