package backend.api.services.Recipes;

import backend.api.repositories.Recipes.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecipeIngredientService
{
    private final RecipeIngredientRepository recipeIngredientRepository;
}