package backend.api.controllers.Recipes;

import backend.api.models.Recipes.*;
import backend.api.services.Recipes.*;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recipe")
public class RecipeController
{
    private final RecipeService recipeService;

    @PostMapping("/add")
    public ResponseEntity<Recipe> addRecipe(@RequestBody RecipeRequest recipeRequest)
    {
        return ResponseEntity.ok(recipeService.addRecipe(recipeRequest));
    }
}