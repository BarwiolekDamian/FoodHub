package backend.api.repositories.Recipes;

import backend.api.models.Recipes.Recipe;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer>
{}