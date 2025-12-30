package mmi.sae_back.DTO;



import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SessionParticipantDTO {
    private Long id;
    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    private Double note; // NOTE attribuée par le formateur
}
