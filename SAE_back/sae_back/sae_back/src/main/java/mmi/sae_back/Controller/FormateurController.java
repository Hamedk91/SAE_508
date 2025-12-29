package mmi.sae_back.Controller;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/formateur")
public class FormateurController {

    @GetMapping("/dashboard")
    public String formateurDashboard() {
        return "Bienvenue FORMATEUR !";
    }
}

