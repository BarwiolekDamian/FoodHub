package backend.api.repositories.Recipes;

import backend.api.models.Recipes.RecipeIngredient;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Integer>
{}