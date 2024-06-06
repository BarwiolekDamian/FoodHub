package backend.api.controllers.Recipes;

import backend.api.models.Recipes.*;
import backend.api.services.Recipes.*;

import java.io.IOException;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recipe-info")
public class RecipeInfoController
{
    private final RecipeInfoService recipeInfoService;

    @PutMapping("/update/{recipeId}/image")
    public ResponseEntity<RecipeInfo> uploadRecipeImage(@PathVariable("recipeId") Integer recipeId, @RequestParam("File") MultipartFile imageFile) throws IOException
    {
        return ResponseEntity.ok(recipeInfoService.uploadRecipeImage(recipeId, imageFile));
    }
}