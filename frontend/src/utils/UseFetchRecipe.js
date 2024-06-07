import axios from 'axios';
import { useEffect, useState } from 'react';

const UseFetchRecipe = ( recipeId ) =>
{
    const [currentRecipe, setCurrentRecipe] = useState(null);

    useEffect (() => {
        if (recipeId)
        {
            axios.get
            (
                `http://localhost:8080/api/recipe/get/${recipeId}`, {}
            )
            .then
            (
                apiResponse =>
                {
                    const responseData = apiResponse.data;

                    // Save Data
                    setCurrentRecipe
                    ({
                        recipeId: responseData.Id,
                        recipeActive: responseData.Active,
                        recipeSteps: responseData.RecipeSteps,
                        recipeAccess: responseData.RecipeAccess,
                        recipeIngredients: responseData.RecipeIngredients,

                        recipeInfo:
                        {
                            recipeTitle: responseData.RecipeInfo.Title,
                            recipeDescription: responseData.RecipeInfo.Description,
                            recipeImageUrl: responseData.RecipeInfo.ImageUrl ? 'http://localhost:8080/' + responseData.RecipeInfo.ImageUrl : '/no-image.png'
                        }
                    });
                }
            );
        }
    }, []);

    return currentRecipe;
}

export default UseFetchRecipe;