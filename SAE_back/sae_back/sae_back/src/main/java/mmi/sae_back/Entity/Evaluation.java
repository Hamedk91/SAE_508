package mmi.sae_back.Entity;



import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private LocalDate dateEvaluation;
    private float noteMax;
    private float noteObtenue;

    @OneToOne
    @JoinColumn(name = "inscription_id")
    private Inscription inscription;

    @ManyToOne
    @JoinColumn(name = "formateur_id")
    private Formateur formateur;

    @OneToOne(mappedBy = "evaluation", cascade = CascadeType.ALL)
    private Attestation attestation;
}
