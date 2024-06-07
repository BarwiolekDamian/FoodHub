import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import AuthRouteWrapper from './AuthRouteWrapper';
import useFetchRecipes from '../utils/UseFetchRecipes';
import useFetchCurrentUser from '../utils/UseFetchCurrentUser';

import '../styles/views/BrowseRecipes.scss';

const BrowseRecipes = ({ accessType, byUser }) =>
{
    const currentUser = useFetchCurrentUser();
    const userRecipes = useFetchRecipes(currentUser?.userId, accessType, byUser);

    if (!currentUser)
        return ( <AppLayout></AppLayout> );

    if (!userRecipes)
        return ( <AppLayout></AppLayout> );

    return (
        <AppLayout>
            <main className = 'mainAppLayout-MainPanel'>
                <div className = 'divAppLayout-HeaderPanel'>
                    <h1 className = 'h1AppLayout-HeaderPanelName'>
                        { !byUser ? 'COMMUNITY \u23F5 BROWSE RECIPES' : `RECIPES \u23F5 MY ${accessType} RECIPES` }
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