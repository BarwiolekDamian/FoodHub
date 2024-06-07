package backend.api.controllers.Recipes;

import backend.api.models.Recipes.*;
import backend.api.services.Recipes.*;

import java.util.List;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recipe")
public class RecipeController
{
    private final RecipeService recipeService;

    @GetMapping("/get/{recipeId}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Integer recipeId)
    {
        return ResponseEntity.ok(recipeService.getRecipeById(recipeId));
    }

    @GetMapping("/get/all/user/{userId}/access/{recipeAccess}")
    public ResponseEntity<List<Recipe>> getRecipesByUserAndAccessLevel(@PathVariable Integer userId, @PathVariable RecipeAccess recipeAccess)
    {
        return ResponseEntity.ok(recipeService.getRecipesByUserAndAccessLevel(userId, recipeAccess));
    }

    @PostMapping("/add")
    public ResponseEntity<Recipe> addRecipe(@RequestBody RecipeRequest recipeRequest)
    {
        return ResponseEntity.ok(recipeService.addRecipe(recipeRequest));
    }
}