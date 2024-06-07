package backend.api.services.Recipes;

import backend.api.models.Recipes.*;
import backend.api.services.Units.*;
import backend.api.services.Users.*;
import backend.api.repositories.Recipes.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

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

    public Recipe getRecipeById(Integer recipeId)
    {
        Optional<Recipe> repoResponse = recipeRepository.findById(recipeId);

        if(repoResponse.isPresent())
            return repoResponse.get();
        else
            throw new NoSuchElementException("INVALID RECIPE: '" + recipeId + "'");
    }

    public List<Recipe> getRecipesByUserAndAccessLevel(Integer userId, RecipeAccess accessLevel)
    {
        return recipeRepository.findByUserIdAndRecipeAccess(userId, accessLevel);
    }

    public List<Recipe> getRecipesByAccessLevel(RecipeAccess accessLevel)
    {
        return recipeRepository.findByRecipeAccess(accessLevel);
    }

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