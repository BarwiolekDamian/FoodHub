import axios from 'axios';
import { useEffect, useState } from 'react';

const UseFetchRecipes = ( userId, recipeAccess, byUser = true ) =>
{
    const [userRecipes, setUserRecipes] = useState([]);

    useEffect (() => {
        if (userId && recipeAccess)
        {
            let axiosHref;

            if (byUser === true)
                axiosHref = `http://localhost:8080/api/recipe/get/all/user/${userId}/access/${recipeAccess}`;
            else if (byUser === false)
                axiosHref = `http://localhost:8080/api/recipe/get/all/access/${recipeAccess}`;

            axios.get
            (
                axiosHref, {}
            )
            .then
            (
                apiResponse =>
                {
                    const responseData = apiResponse.data;

                    if (responseData && Array.isArray(responseData))
                    {
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
                    else
                    {
                        // Save Data
                        setUserRecipes([]);
                    }
                }
            );
        }
    }, [userId]);

    return userRecipes;
}

export default UseFetchRecipes;