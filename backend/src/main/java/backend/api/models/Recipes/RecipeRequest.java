package backend.api.models.Recipes;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeRequest
{
    private Integer userId;

    private String recipeTitle;

    private String recipeDescription;

    private RecipeAccess recipeAccess;

    private List<RecipeStep> recipeSteps;

    private List<RecipeIngredient> recipeIngredients;
}