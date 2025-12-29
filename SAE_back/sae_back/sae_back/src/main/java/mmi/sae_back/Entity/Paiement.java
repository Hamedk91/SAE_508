package mmi.sae_back.Entity;



import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paiement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal montant;
    private LocalDateTime datePaiement;
    private String methode;
    private String statut;
    private String reference;

    @OneToOne
    @JoinColumn(name = "inscription_id")
    private Inscription inscription;
}
