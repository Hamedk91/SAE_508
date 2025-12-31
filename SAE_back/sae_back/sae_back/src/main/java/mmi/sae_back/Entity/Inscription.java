package mmi.sae_back.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "participant_id")
    @JsonIgnoreProperties({"motDePasse", "dateInscription"})
    private Utilisateur participant;

    @ManyToOne
    @JoinColumn(name = "session_id")
    @JsonIgnoreProperties("inscriptions")
    private SessionFormation session;

    @OneToMany(mappedBy = "inscription", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Note> notes;
}
