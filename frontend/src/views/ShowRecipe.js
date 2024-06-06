import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import AuthRouteWrapper from './AuthRouteWrapper';
import useFetchRecipe from '../utils/UseFetchRecipe';
import RecipeMainInput from '../components/RecipeMainInput';
import RecipeStepInput from '../components/RecipeStepInput';
import RecipeIngredientInput from '../components/RecipeIngredientInput';

import '../styles/views/RecipeView.scss';

const ShowRecipe = () =>
{
    const { recipeId } = useParams();
    const currentRecipe = useFetchRecipe(recipeId);

    if (!currentRecipe)
        return ( <AppLayout></AppLayout> );

    return (
        <AppLayout>
            <main className = 'mainAppLayout-MainPanel'>
                <div className = 'divAppLayout-HeaderPanel'>
                    <h1 className = 'h1AppLayout-HeaderPanelName'>
                        RECIPES <span>&#x23F5;</span> { currentRecipe.recipeId }
                    </h1>
                </div>

                <div className = 'divAppLayout-ContentPanel'>
                    <form className = 'formRecipe-Main'>
                        <RecipeMainInput
                            inputType = 'text'
                            inputName = 'recipeTitle'
                            inputValue = { currentRecipe.recipeInfo.recipeTitle }
                        />

                        <div className = 'divShowRecipe-ImageWrapper'>
                            <img
                                alt = ''
                                className = "imgShowRecipe"
                                src = { currentRecipe.recipeInfo.recipeImageUrl } 
                            />
                        </div>

                        <RecipeMainInput
                            inputType = 'textarea'
                            inputName = 'recipeDescription'
                            inputValue = { currentRecipe.recipeInfo.recipeDescription }
                        />
                    </form>

                    <form className = 'formRecipe-Ingredients'>
                        <h1 className = 'h1Recipe-SectionTitle'>INGREDIENTS:</h1>

                        {currentRecipe.recipeIngredients.map((currIngredient, arrayIndex) => {
                            let inputValue =
                            {
                                ingredientName: currIngredient.Name,
                                ingredientUnit: currIngredient.Unit.Symbol,
                                ingredientQuantity: currIngredient.Quantity
                            };

                            return (
                                <RecipeIngredientInput
                                    key = { `Ingredient_${arrayIndex + 1}` }
                                    ingredientSequence = { arrayIndex + 1 }
                                    inputValue = { inputValue }
                                />
                            );
                        })}
                    </form>

                    <form className = 'formRecipe-Steps'>
                        <h1 className = 'h1Recipe-SectionTitle'>STEPS:</h1>

                        {currentRecipe.recipeSteps.map((currStep, arrayIndex) => (
                            <RecipeStepInput
                                key = { `Step_${arrayIndex + 1}` }
                                stepSequence = { arrayIndex + 1 }
                                inputValue = { currStep.Content }
                            />
                        ))}
                    </form>
                </div>
            </main>
        </AppLayout>
    );
}

export default AuthRouteWrapper(ShowRecipe);