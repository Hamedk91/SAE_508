package mmi.sae_back.Entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Attestation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private LocalDate dateGeneration;
    @Lob
    private String contenu;

    @OneToOne
    @JoinColumn(name = "evaluation_id")
    private Evaluation evaluation;
}
