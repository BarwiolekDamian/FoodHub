package backend.api.controllers.Recipes;

import backend.api.services.Recipes.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recipe-ingredient")
public class RecipeIngredientController
{
    private final RecipeIngredientService recipeIngredientService;
}