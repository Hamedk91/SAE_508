package mmi.sae_back.DTO;

import lombok.Data;
import java.util.List;

@Data
public class FormationDTO {
    private Long id;
    private String titre;
    private String description;
    private List<SessionParticipantDTO> sessions;
}
