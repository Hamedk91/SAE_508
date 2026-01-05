package mmi.sae_back.Controller;

import mmi.sae_back.DTO.FormationDTO;
import mmi.sae_back.DTO.SessionParticipantDTO;
import mmi.sae_back.Entity.Inscription;
import mmi.sae_back.Entity.Note;
import mmi.sae_back.Entity.SessionFormation;
import mmi.sae_back.Entity.Utilisateur;
import mmi.sae_back.Repository.InscriptionRepository;
import mmi.sae_back.Repository.SessionFormationRepository;
import mmi.sae_back.Repository.UtilisateurRepository;
import mmi.sae_back.Config.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/participant")
@CrossOrigin(origins = "http://localhost:3000")
public class ParticipantController {

    private final InscriptionRepository inscriptionRepository;
    private final SessionFormationRepository sessionRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final JwtUtil jwtUtil;

    public ParticipantController(
            InscriptionRepository inscriptionRepository,
            SessionFormationRepository sessionRepository,
            UtilisateurRepository utilisateurRepository,
            JwtUtil jwtUtil
    ) {
        this.inscriptionRepository = inscriptionRepository;
        this.sessionRepository = sessionRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.jwtUtil = jwtUtil;
    }

    /* ===================== UTILS ===================== */
    private Long getUserIdFromToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Token manquant");
        }
        String token = authHeader.replace("Bearer ", "");
        return jwtUtil.getUserId(token);
    }

    /* ===================== PROFIL ===================== */
    @GetMapping("/profil")
    public Utilisateur getProfil(@RequestHeader("Authorization") String auth) {
        Long userId = getUserIdFromToken(auth);
        return utilisateurRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    /* ===================== MES FORMATIONS ===================== */
    @GetMapping("/formations")
    public List<FormationDTO> getMesFormations(@RequestHeader("Authorization") String auth) {
        Long userId = getUserIdFromToken(auth);

        List<Inscription> inscriptions = inscriptionRepository.findByParticipant_Id(userId);

        if (inscriptions.isEmpty()) return new ArrayList<>();

        Map<Long, FormationDTO> formationMap = new HashMap<>();

        for (Inscription inscription : inscriptions) {
            SessionFormation session = inscription.getSession();
            if (session == null || session.getFormation() == null) continue;

            Long formationId = session.getFormation().getId();

            formationMap.putIfAbsent(formationId, new FormationDTO() {{
                setId(formationId);
                setTitre(session.getFormation().getTitre());
                setDescription(session.getFormation().getDescription());
                setSessions(new ArrayList<>());
            }});

            SessionParticipantDTO sessionDTO = new SessionParticipantDTO();
            sessionDTO.setId(session.getId());
            sessionDTO.setDateDebut(session.getDateDebut());
            sessionDTO.setDateFin(session.getDateFin());
            sessionDTO.setLieu(session.getLieu());
            sessionDTO.setStatut(session.getStatut());

            sessionDTO.setNote(
                    inscription.getNotes() == null || inscription.getNotes().isEmpty()
                            ? null
                            : inscription.getNotes().get(0).getValeur()
            );

            formationMap.get(formationId).getSessions().add(sessionDTO);
        }

        return new ArrayList<>(formationMap.values());
    }

    /* ===================== NOTES D’UNE SESSION ===================== */
    @GetMapping("/sessions/{sessionId}/notes")
    public List<Note> mesNotes(
            @RequestHeader("Authorization") String auth,
            @PathVariable Long sessionId
    ) {
        Long userId = getUserIdFromToken(auth);

        Inscription inscription = inscriptionRepository
                .findByParticipant_IdAndSession_Id(userId, sessionId)
                .orElseThrow(() -> new RuntimeException("Inscription introuvable"));

        return inscription.getNotes();
    }

    /* ===================== DÉSINSCRIPTION ===================== */
    @DeleteMapping("/inscriptions/{sessionId}")
    public ResponseEntity<String> desinscrire(
            @RequestHeader("Authorization") String auth,
            @PathVariable Long sessionId
    ) {
        Long userId = getUserIdFromToken(auth);

        Inscription inscription = inscriptionRepository
                .findByParticipant_IdAndSession_Id(userId, sessionId)
                .orElseThrow(() -> new RuntimeException("Inscription non trouvée"));

        inscriptionRepository.delete(inscription);

        SessionFormation session = inscription.getSession();
        if (session != null) {
            session.setPlacesRestantes(session.getPlacesRestantes() + 1);
            sessionRepository.save(session);
        }

        return ResponseEntity.ok("Désinscription réussie");
    }

    /* ===================== INSCRIPTION À UNE SESSION ===================== */
    @PostMapping("/sessions/{sessionId}/inscrire")
    public ResponseEntity<String> inscrire(
            @RequestHeader("Authorization") String auth,
            @PathVariable Long sessionId
    ) {
        Long userId = getUserIdFromToken(auth);

        Utilisateur participant = utilisateurRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        SessionFormation session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session non trouvée"));

        if (session.getPlacesRestantes() <= 0) {
            return ResponseEntity.badRequest().body("Plus de places disponibles");
        }

        boolean alreadyInscrit = inscriptionRepository.findByParticipant_IdAndSession_Id(userId, sessionId).isPresent();
        if (alreadyInscrit) {
            return ResponseEntity.badRequest().body("Vous êtes déjà inscrit à cette session");
        }

        Inscription inscription = new Inscription();
        inscription.setParticipant(participant);
        inscription.setSession(session);
        inscriptionRepository.save(inscription);

        session.setPlacesRestantes(session.getPlacesRestantes() - 1);
        sessionRepository.save(session);

        return ResponseEntity.ok("Inscription réussie !");
    }
}
