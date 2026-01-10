package mmi.sae_back.Config;


import mmi.sae_back.Entity.Inscription;
import mmi.sae_back.Entity.SessionFormation;
import mmi.sae_back.Entity.Utilisateur;
import mmi.sae_back.Repository.InscriptionRepository;
import mmi.sae_back.Repository.SessionFormationRepository;
import mmi.sae_back.Repository.UtilisateurRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UtilisateurRepository utilisateurRepository;
    private final SessionFormationRepository sessionRepository;
    private final InscriptionRepository inscriptionRepository;

    public DataInitializer(
            UtilisateurRepository utilisateurRepository,
            SessionFormationRepository sessionRepository,
            InscriptionRepository inscriptionRepository
    ) {
        this.utilisateurRepository = utilisateurRepository;
        this.sessionRepository = sessionRepository;
        this.inscriptionRepository = inscriptionRepository;
    }

    @Override
    public void run(String... args) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        /* ===================== 1️⃣ CRÉER 5 UTILISATEURS ===================== */

        List<Utilisateur> utilisateurs = new ArrayList<>();

        for (int i = 1; i <= 5; i++) {
            String email = "user" + i + "@example.com";

            if (utilisateurRepository.findByEmail(email).isPresent()) continue;

            Utilisateur u = new Utilisateur();
            u.setEmail(email);
            u.setMotDePasse(encoder.encode("12345")); // ✅ mot de passe = 12345
            u.setNom("Utilisateur");
            u.setPrenom("Test" + i);
            u.setRole("UTILISATEUR");

            utilisateurs.add(utilisateurRepository.save(u));
        }

        if (utilisateurs.isEmpty()) {
            utilisateurs = utilisateurRepository.findByRole("UTILISATEUR");
        }

        /* ===================== 2️⃣ INSCRIPTIONS PAR SESSION ===================== */

        List<SessionFormation> sessions = sessionRepository.findAll();

        for (SessionFormation session : sessions) {

            int inscrits = inscriptionRepository.findBySession_Id(session.getId()).size();
            if (inscrits >= 5) continue;

            for (Utilisateur user : utilisateurs) {

                if (inscrits >= 5) break;

                // Déjà inscrit à cette session ?
                if (inscriptionRepository
                        .findByParticipant_IdAndSession_Id(user.getId(), session.getId())
                        .isPresent()) {
                    continue;
                }

                // Vérifier chevauchement de dates
                boolean conflit = inscriptionRepository
                        .findByParticipant_Id(user.getId())
                        .stream()
                        .anyMatch(ins -> chevaucheDates(
                                ins.getSession().getDateDebut(),
                                ins.getSession().getDateFin(),
                                session.getDateDebut(),
                                session.getDateFin()
                        ));

                if (conflit) continue;

                Inscription inscription = new Inscription();
                inscription.setParticipant(user);
                inscription.setSession(session);

                inscriptionRepository.save(inscription);

                session.setPlacesRestantes(session.getPlacesRestantes() - 1);
                sessionRepository.save(session);

                inscrits++;
            }
        }

        System.out.println("✅ UTILISATEURS + INSCRIPTIONS CRÉÉS AVEC SUCCÈS");
    }

    /* ===================== UTIL DATE ===================== */

    private boolean chevaucheDates(
            LocalDateTime d1Debut,
            LocalDateTime d1Fin,
            LocalDateTime d2Debut,
            LocalDateTime d2Fin
    ) {
        return !(d1Fin.isBefore(d2Debut) || d1Debut.isAfter(d2Fin));
    }
}
