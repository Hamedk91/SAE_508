package mmi.sae_back.Entity;



import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Emargement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateSeance;
    private LocalDateTime heureArrivee;
    private LocalDateTime heureDepart;
    private boolean present;

    @ManyToOne
    @JoinColumn(name = "inscription_id")
    private Inscription inscription;
}

