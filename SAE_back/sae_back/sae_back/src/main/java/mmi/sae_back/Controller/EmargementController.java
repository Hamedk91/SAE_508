package mmi.sae_back.Controller;

import mmi.sae_back.DTO.EmargementRequest;
import mmi.sae_back.Entity.*;
import mmi.sae_back.Repository.*;
import mmi.sae_back.Config.JwtUtil;
import mmi.sae_back.Service.EmargementPdfService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/emargement")
@CrossOrigin(origins = "http://localhost:3000")
public class EmargementController {

    private final EmargementRepository emargementRepo;
    private final InscriptionRepository inscriptionRepo;
    private final FormateurRepository formateurRepo;
    private final SessionFormationRepository sessionRepo;
    private final EmargementPdfService pdfService;
    private final JwtUtil jwtUtil;

    public EmargementController(
            EmargementRepository emargementRepo,
            InscriptionRepository inscriptionRepo,
            FormateurRepository formateurRepo,
            SessionFormationRepository sessionRepo,
            EmargementPdfService pdfService,
            JwtUtil jwtUtil
    ) {
        this.emargementRepo = emargementRepo;
        this.inscriptionRepo = inscriptionRepo;
        this.formateurRepo = formateurRepo;
        this.sessionRepo = sessionRepo;
        this.pdfService = pdfService;
        this.jwtUtil = jwtUtil;
    }

    // 🔹 LISTE DES ÉMARGEMENTS PAR SESSION + DATE
    @GetMapping("/session/{sessionId}")
    public List<Emargement> getEmargements(
            @PathVariable Long sessionId,
            @RequestParam String date
    ) {
        return emargementRepo.findByInscription_Session_IdAndDate(
                sessionId,
                LocalDate.parse(date)
        );
    }

    // 🔹 VALIDER UN ÉMARGEMENT
    @PostMapping("/valider")
    public ResponseEntity<?> emarger(
            @RequestHeader("Authorization") String auth,
            @RequestBody EmargementRequest request
    ) {
        Long formateurId = jwtUtil.getUserId(auth.replace("Bearer ", ""));
        Formateur formateur = formateurRepo.findById(formateurId)
                .orElseThrow(() -> new RuntimeException("Formateur introuvable"));

        if (emargementRepo.existsByInscription_IdAndDate(
                request.getInscriptionId(),
                request.getDate()
        )) {
            return ResponseEntity.badRequest()
                    .body("Émargement déjà enregistré pour ce jour");
        }

        Inscription inscription = inscriptionRepo.findById(request.getInscriptionId())
                .orElseThrow(() -> new RuntimeException("Inscription introuvable"));

        Emargement e = new Emargement();
        e.setDate(request.getDate());
        e.setStatut(request.getStatut());
        e.setInscription(inscription);
        e.setValidePar(formateur);

        // ✅ conversion enum → bool
        e.setPresent(request.getStatut() == EmargementEnum.PRESENT);

        return ResponseEntity.ok(emargementRepo.save(e));
    }

    // 🔹 GÉNÉRER PDF (solution 2)
    @GetMapping("/session/{sessionId}/pdf")
    public ResponseEntity<byte[]> generatePdf(
            @PathVariable Long sessionId,
            @RequestParam String date,
            @RequestHeader("Authorization") String auth
    ) {
        Long formateurId = jwtUtil.getUserId(auth.replace("Bearer ", ""));
        SessionFormation session = sessionRepo.findById(sessionId).orElseThrow();

        if (!session.getFormateur().getId().equals(formateurId)) {
            return ResponseEntity.status(403).build();
        }

        // 🔹 On appelle le service PDF qui récupère directement les émargements
        byte[] pdf = pdfService.generatePdf(session, LocalDate.parse(date));

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=emargement.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}
