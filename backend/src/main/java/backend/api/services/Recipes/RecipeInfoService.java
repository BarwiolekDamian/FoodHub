package backend.api.services.Recipes;

import backend.api.models.Recipes.*;
import backend.api.repositories.Recipes.*;

import java.util.Optional;
import java.nio.file.Path;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.NoSuchElementException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecipeInfoService
{
    private final RecipeInfoRepository recipeInfoRepository;

    public RecipeInfo getRecipeInfoById(Integer recipeId)
    {
        Optional<RecipeInfo> repoResponse = recipeInfoRepository.findById(recipeId);

        if(repoResponse.isPresent())
            return repoResponse.get();
        else
            throw new NoSuchElementException("INVALID RECIPE INFO: '" + recipeId + "'");
    }

    public RecipeInfo uploadRecipeImage(Integer recipeId, MultipartFile avatarFile) throws IOException
    {
        RecipeInfo recipeInfo = getRecipeInfoById(recipeId);
        String fileName = String.valueOf(recipeId) + ".png";

        Path targetDir = Paths.get("backend/src/main/resources/static/recipe-images");
        Files.copy(avatarFile.getInputStream(), targetDir.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

        recipeInfo.setImageUrl("recipe-images/" + fileName);
        return recipeInfoRepository.save(recipeInfo);
    }
}