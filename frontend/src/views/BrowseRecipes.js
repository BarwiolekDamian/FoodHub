import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import AuthRouteWrapper from './AuthRouteWrapper';
import useFetchUserRecipes from '../utils/UseFetchUserRecipes';
import useFetchCurrentUser from '../utils/UseFetchCurrentUser';

import '../styles/views/BrowseRecipes.scss';

const BrowseRecipes = ({ accessType }) =>
{
    const currentUser = useFetchCurrentUser();
    const userRecipes = useFetchUserRecipes(currentUser?.userId, accessType);

    if (!currentUser)
        return ( <AppLayout></AppLayout> );

    if (!userRecipes)
        return ( <AppLayout></AppLayout> );

    return (
        <AppLayout>
            <main className = 'mainAppLayout-MainPanel'>
                <div className = 'divAppLayout-HeaderPanel'>
                    <h1 className = 'h1AppLayout-HeaderPanelName'>
                        RECIPES <span>&#x23F5;</span> MY { accessType } RECIPES
                    </h1>
                </div>

                <div className = 'divAppLayout-ContentPanel'>
                    <div className = 'divBrowseRecipes-RecipesGrid'>
                        {userRecipes.map(currentRecipe => (
                            <Link to = { `/recipe/${currentRecipe.recipeId}` } key = { currentRecipe.recipeId } className = 'linkBrowseRecipes-RecipeCard'>
                                <img
                                    alt = ''
                                    className = 'imgBrowseRecipes-RecipeImage'
                                    src = { currentRecipe.recipeInfo.recipeImageUrl }
                                />

                                <div className = 'divBrowseRecipes-RecipeDetails'>
                                    <h3 className = 'h3BrowseRecipes-RecipeTitle'>{ currentRecipe.recipeInfo.recipeTitle }</h3>
                                    <p className = 'pBrowseRecipes-RecipeDescription'>{ currentRecipe.recipeInfo.recipeDescription }</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}

export default AuthRouteWrapper(BrowseRecipes);