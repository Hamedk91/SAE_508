package mmi.sae_back.Service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import mmi.sae_back.Entity.*;
import mmi.sae_back.Repository.EmargementRepository;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.List;

@Service
public class EmargementPdfService {

    private final EmargementRepository emargementRepo;

    public EmargementPdfService(EmargementRepository emargementRepo) {
        this.emargementRepo = emargementRepo;
    }

    public byte[] generatePdf(SessionFormation session, LocalDate date) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, out);

            document.open();

            // 🔹 TITRE
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            document.add(new Paragraph("Feuille d’émargement", titleFont));
            document.add(new Paragraph(" "));

            // 🔹 INFOS SESSION
            document.add(new Paragraph("Formation : " + session.getFormation().getTitre()));
            document.add(new Paragraph("Date : " + date));
            document.add(new Paragraph("Lieu : " + session.getLieu()));
            document.add(new Paragraph("Formateur : " + session.getFormateur().getNom() + " " + session.getFormateur().getPrenom()));
            document.add(new Paragraph(" "));

            // 🔹 TABLEAU AVEC UNE SEULE COLONNE STATUT
            PdfPTable table = new PdfPTable(3); // Nom / Prénom / Statut
            table.setWidthPercentage(100);

            table.addCell("Nom");
            table.addCell("Prénom");
            table.addCell("Statut");

            // 🔹 CHARGER LES ÉMARGEMENTS POUR LA SESSION + DATE
            List<Emargement> emargements = emargementRepo.findByInscription_Session_IdAndDate(session.getId(), date);

            for (Emargement e : emargements) {
                String statut = e.getStatut() != null ? e.getStatut().name() : "NON EMARGÉ";

                table.addCell(e.getInscription().getParticipant().getNom());
                table.addCell(e.getInscription().getParticipant().getPrenom());
                table.addCell(statut);
            }

            document.add(table);
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Signature du formateur : _______________________"));

            document.close();
            return out.toByteArray();

        } catch (Exception ex) {
            throw new RuntimeException("Erreur génération PDF : " + ex.getMessage(), ex);
        }
    }
}
