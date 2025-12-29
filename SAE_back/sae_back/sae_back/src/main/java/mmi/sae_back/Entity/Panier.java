package mmi.sae_back.Entity;



import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Panier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateCreation;
    private String statut;

    @OneToOne
    @JoinColumn(name = "participant_id")
    private Participant participant;

    @ManyToMany
    @JoinTable(
            name = "panier_session",
            joinColumns = @JoinColumn(name = "panier_id"),
            inverseJoinColumns = @JoinColumn(name = "session_id")
    )
    private List<SessionFormation> sessions;
}

