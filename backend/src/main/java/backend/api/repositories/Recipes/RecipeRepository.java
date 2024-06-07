package backend.api.repositories.Recipes;

import backend.api.models.Recipes.Recipe;
import backend.api.models.Recipes.RecipeAccess;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer>
{
    List<Recipe> findByUserIdAndRecipeAccess(Integer userId, RecipeAccess accessLevel);
}