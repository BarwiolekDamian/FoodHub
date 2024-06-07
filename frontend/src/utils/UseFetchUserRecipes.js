import axios from 'axios';
import { useEffect, useState } from 'react';

const UseFetchUserRecipes = ( userId, recipeAccess ) =>
{
    const [userRecipes, setUserRecipes] = useState([]);

    useEffect (() => {
        if (userId && recipeAccess)
        {
            axios.get
            (
                `http://localhost:8080/api/recipe/get/all/user/${userId}/access/${recipeAccess}`, {}
            )
            .then
            (
                apiResponse =>
                {
                    const responseData = apiResponse.data;

                    const fetchedRecipes = responseData.map
                    (
                        currRecipe =>
                        ({
                            recipeId: currRecipe.Id,
                            recipeActive: currRecipe.Active,
                            recipeSteps: currRecipe.RecipeSteps,
                            recipeAccess: currRecipe.RecipeAccess,
                            recipeIngredients: currRecipe.RecipeIngredients,
    
                            recipeInfo:
                            {
                                recipeTitle: currRecipe.RecipeInfo.Title,
                                recipeDescription: currRecipe.RecipeInfo.Description,
                                recipeImageUrl: currRecipe.RecipeInfo.ImageUrl ? 'http://localhost:8080/' + currRecipe.RecipeInfo.ImageUrl : '/no-image.png'
                            }
                        })
                    );

                    // Save Data
                    setUserRecipes(fetchedRecipes);
                }
            );
        }
    }, [userId]);

    return userRecipes;
}

export default UseFetchUserRecipes;