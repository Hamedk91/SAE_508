package mmi.sae_back.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String description;
    private int duree; // heures
    private BigDecimal prix;
    private String prerequis;

    @ManyToOne
    @JoinColumn(name = "categorie_id")
    private CategorieFormation categorie;

    @OneToMany(mappedBy = "formation", cascade = CascadeType.ALL)
    @JsonIgnore // empêche la sérialisation des sessions ici
    private List<SessionFormation> sessions;
}
