package mmi.sae_back.Controller;

import mmi.sae_back.Entity.CategorieFormation;
import mmi.sae_back.Repository.CategorieFormationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategorieFormationController {

    private final CategorieFormationRepository repository;

    public CategorieFormationController(CategorieFormationRepository repository) {
        this.repository = repository;
    }

    // 🔹 Toutes les catégories
    @GetMapping
    public List<CategorieFormation> getAllCategories() {
        return repository.findAll();
    }

    // 🔹 Ajouter une catégorie
    @PostMapping
    public CategorieFormation addCategory(@RequestBody CategorieFormation c) {
        return repository.save(c);
    }

    // 🔹 Modifier une catégorie
    @PutMapping("/{id}")
    public CategorieFormation updateCategory(@PathVariable Long id, @RequestBody CategorieFormation c) {
        CategorieFormation existing = repository.findById(id).orElseThrow();
        existing.setNom(c.getNom());
        return repository.save(existing);
    }

    // 🔹 Supprimer une catégorie
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
