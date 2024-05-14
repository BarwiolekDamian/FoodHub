package backend.api.repositories.Recipes;

import backend.api.models.Recipes.RecipeStep;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface RecipeStepRepository extends JpaRepository<RecipeStep, Integer>
{}