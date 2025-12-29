package mmi.sae_back.DTO;

import mmi.sae_back.Entity.SessionFormation;
import lombok.Data;
import java.util.List;

@Data
public class FormationDTO {
    private Long id;
    private String titre;
    private String description;
    private List<SessionFormation> sessions;
}
