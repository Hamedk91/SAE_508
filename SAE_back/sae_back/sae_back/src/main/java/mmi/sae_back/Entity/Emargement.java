package mmi.sae_back.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Emargement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Date du jour d’émargement
    @Column(nullable = false)
    private LocalDate date;

    // PRESENT / ABSENT / RETARD
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EmargementEnum statut;

    // Présence booléenne (utile pour stats)
    @Column(nullable = false)
    private Boolean present;

    // Lien vers l’inscription
    @ManyToOne
    @JoinColumn(name = "inscription_id", nullable = false)
    @JsonIgnoreProperties({"notes", "session"})
    private Inscription inscription;

    // Formateur qui valide
    @ManyToOne
    @JoinColumn(name = "formateur_id", nullable = false)
    @JsonIgnoreProperties({"motDePasse", "password"})
    private Formateur validePar;
}
