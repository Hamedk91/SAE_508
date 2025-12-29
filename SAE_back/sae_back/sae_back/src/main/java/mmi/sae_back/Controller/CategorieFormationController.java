package mmi.sae_back.Controller;

import mmi.sae_back.Entity.CategorieFormation;
import mmi.sae_back.Repository.CategorieFormationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(
        origins = "http://localhost:3000",
        allowedHeaders = "*",
        methods = {RequestMethod.GET}
)
public class CategorieFormationController {

    private final CategorieFormationRepository repository;

    public CategorieFormationController(CategorieFormationRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<CategorieFormation> getAllCategories() {
        return repository.findAll();
    }
}
