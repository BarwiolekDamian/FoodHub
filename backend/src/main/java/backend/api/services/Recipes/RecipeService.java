package backend.api.services.Recipes;

import backend.api.models.Recipes.*;
import backend.api.services.Units.*;
import backend.api.services.Users.*;
import backend.api.repositories.Recipes.*;

import java.util.Date;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecipeService
{
    private final RecipeRepository recipeRepository;
    private final UnitService unitService;
    private final UserService userService;

    @Transactional
    public Recipe addRecipe(RecipeRequest recipeRequest)
    {
        RecipeInfo recipeInfo = new RecipeInfo
        (
            null,
            recipeRequest.getRecipeTitle(),
            recipeRequest.getRecipeDescription(),
            null,
            new Date(),
            new Date()
        );

        Recipe newRecipe = new Recipe
        (
            null,
            true,
            recipeRequest.getRecipeAccess(),
            recipeInfo,
            null,
            null,
            userService.getUserById(recipeRequest.getUserId())
        );

        newRecipe = recipeRepository.save(newRecipe);

        for (RecipeStep recipeStep : recipeRequest.getRecipeSteps())
        {
            recipeStep.setRecipe(newRecipe);
        }

        for (RecipeIngredient recipeIngredient : recipeRequest.getRecipeIngredients())
        {
            recipeIngredient.setRecipe(newRecipe);
            recipeIngredient.setUnit(unitService.getUnitBySymbol(recipeIngredient.getUnit().getSymbol()));
        }

        newRecipe.setRecipeSteps(recipeRequest.getRecipeSteps());
        newRecipe.setRecipeIngredients(recipeRequest.getRecipeIngredients());

        return recipeRepository.save(newRecipe);
    }
}