package mmi.sae_back.Entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;          // ex: "Contrôle continu"
    private Double valeur;       // ex: 15.5
    private Double coefficient;  // ex: 2

    @ManyToOne
    @JoinColumn(name = "inscription_id", nullable = false)
    @JsonIgnoreProperties({"notes", "session", "participant"})
    private Inscription inscription;
}
