package mmi.sae_back.Controller;

import mmi.sae_back.DTO.FormationDTO;
import mmi.sae_back.Entity.Inscription;
import mmi.sae_back.Entity.SessionFormation;
import mmi.sae_back.Entity.Utilisateur;
import mmi.sae_back.Repository.InscriptionRepository;
import mmi.sae_back.Repository.SessionFormationRepository;
import mmi.sae_back.Repository.UtilisateurRepository;
import mmi.sae_back.Config.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/participant")
@CrossOrigin(origins = "http://localhost:3000")
public class ParticipantController {

    private final InscriptionRepository inscriptionRepository;
    private final SessionFormationRepository sessionRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final JwtUtil jwtUtil;

    public ParticipantController(InscriptionRepository inscriptionRepository,
                                 SessionFormationRepository sessionRepository,
                                 UtilisateurRepository utilisateurRepository,
                                 JwtUtil jwtUtil) {
        this.inscriptionRepository = inscriptionRepository;
        this.sessionRepository = sessionRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.jwtUtil = jwtUtil;
    }

    private Long getUserIdFromToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Token manquant");
        }
        String token = authHeader.replace("Bearer ", "");
        return jwtUtil.getUserId(token);
    }

    /* ===== PROFIL ===== */
    @GetMapping("/profil")
    public Utilisateur getProfil(@RequestHeader("Authorization") String auth) {
        Long userId = getUserIdFromToken(auth);
        return utilisateurRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    /* ===== MES FORMATIONS ===== */
    @GetMapping("/formations")
    public List<FormationDTO> getMesFormations(@RequestHeader("Authorization") String auth) {
        try {
            Long userId = getUserIdFromToken(auth);
            System.out.println("🟢 [DEBUG] Récupération formations pour userId: " + userId);

            // Récupérer toutes les inscriptions de l'utilisateur
            List<Inscription> inscriptions = inscriptionRepository.findByParticipant_Id(userId);
            System.out.println("📊 [DEBUG] Nombre d'inscriptions trouvées: " + inscriptions.size());

            if (inscriptions.isEmpty()) {
                System.out.println("⚠️ [DEBUG] Aucune inscription trouvée pour l'utilisateur");
                return new ArrayList<>();
            }

            // Afficher les détails des inscriptions
            for (Inscription inscription : inscriptions) {
                System.out.println("📝 [DEBUG] Inscription ID: " + inscription.getId());
                System.out.println("📝 [DEBUG]   - Session ID: " + inscription.getSession().getId());
                System.out.println("📝 [DEBUG]   - Formation ID: " + inscription.getSession().getFormation().getId());
                System.out.println("📝 [DEBUG]   - Formation Titre: " + inscription.getSession().getFormation().getTitre());
            }

            // Créer une map pour grouper par formation
            Map<Long, FormationDTO> formationMap = new HashMap<>();

            for (Inscription inscription : inscriptions) {
                SessionFormation session = inscription.getSession();
                if (session != null && session.getFormation() != null) {
                    Long formationId = session.getFormation().getId();

                    if (!formationMap.containsKey(formationId)) {
                        FormationDTO dto = new FormationDTO();
                        dto.setId(formationId);
                        dto.setTitre(session.getFormation().getTitre());
                        dto.setDescription(session.getFormation().getDescription());
                        dto.setSessions(new ArrayList<>());
                        formationMap.put(formationId, dto);
                        System.out.println("🎯 [DEBUG] Nouvelle formation ajoutée: " + dto.getTitre());
                    }

                    // Ajouter la session si elle n'existe pas déjà
                    FormationDTO dto = formationMap.get(formationId);
                    boolean sessionExists = dto.getSessions().stream()
                            .anyMatch(s -> s.getId().equals(session.getId()));

                    if (!sessionExists) {
                        dto.getSessions().add(session);
                        System.out.println("➕ [DEBUG] Session ajoutée à la formation: " +
                                session.getId() + " -> " + dto.getTitre());
                    }
                } else {
                    System.out.println("❌ [DEBUG] Session ou formation null pour l'inscription: " + inscription.getId());
                }
            }

            List<FormationDTO> result = new ArrayList<>(formationMap.values());
            System.out.println("✅ [DEBUG] Nombre de formations à retourner: " + result.size());

            for (FormationDTO dto : result) {
                System.out.println("📋 [DEBUG] Formation finale: " + dto.getTitre() +
                        " (Sessions: " + dto.getSessions().size() + ")");
            }

            return result;
        } catch (Exception e) {
            System.err.println("💥 [DEBUG] Erreur dans getMesFormations: " + e.getMessage());
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    /* ===== SUPPRIMER INSCRIPTION ===== */
    @DeleteMapping("/inscriptions/{sessionId}")
    public ResponseEntity<String> desinscrire(@RequestHeader("Authorization") String auth,
                                              @PathVariable Long sessionId) {
        try {
            Long userId = getUserIdFromToken(auth);

            Optional<Inscription> inscriptionOpt = inscriptionRepository
                    .findByParticipant_IdAndSession_Id(userId, sessionId);

            if (inscriptionOpt.isEmpty()) {
                return ResponseEntity.status(404).body("Inscription non trouvée");
            }

            Inscription inscription = inscriptionOpt.get();

            // Supprimer l'inscription
            inscriptionRepository.delete(inscription);

            // Ajouter +1 place dans la session si elle existe
            SessionFormation session = inscription.getSession();
            if (session != null) {
                Integer places = session.getPlacesRestantes();
                session.setPlacesRestantes(places != null ? places + 1 : 1);
                sessionRepository.save(session);
            }

            return ResponseEntity.ok("Désinscription réussie");
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body("Token invalide ou manquant");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur serveur lors de la désinscription");
        }
    }

}