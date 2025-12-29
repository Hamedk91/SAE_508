package mmi.sae_back.Controller;

import mmi.sae_back.Entity.Utilisateur;
import mmi.sae_back.Service.UtilisateurService;
import mmi.sae_back.Config.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // compatible port 3000
public class AuthRestController {

    private final UtilisateurService utilisateurService;
    private final JwtUtil jwtUtil;

    public AuthRestController(UtilisateurService utilisateurService, JwtUtil jwtUtil) {
        this.utilisateurService = utilisateurService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Utilisateur user) {
        try {
            System.out.println("Tentative login: " + user.getEmail());

            return utilisateurService.login(user.getEmail(), user.getMotDePasse())
                    .map(u -> {
                        String token = jwtUtil.generateToken(u.getId(), u.getRole());
                        return ResponseEntity.ok(
                                Map.of("token", token, "role", u.getRole())
                        );
                    })
                    .orElse(ResponseEntity.status(401)
                            .body(Map.of("error", "Email ou mot de passe incorrect"))
                    );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Erreur serveur"));
        }
    }
}
