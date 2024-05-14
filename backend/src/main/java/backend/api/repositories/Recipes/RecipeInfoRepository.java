package backend.api.repositories.Recipes;

import backend.api.models.Recipes.RecipeInfo;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface RecipeInfoRepository extends JpaRepository<RecipeInfo, Integer>
{}