import React from 'react';

import '../styles/components/RecipeIngredientInput.scss';

const RecipeIngredientInput = ({ ingredientSequence, inputValue = [], onChange }) =>
{
    const [ingredientName = null, ingredientQuantity = null, ingredientUnit = null] = inputValue;

    const handleNameChange = (inputEvent) =>
    {
        onChange(ingredientSequence, 'ingredientName', inputEvent.target.value);
    };

    const handleQuantityChange = (inputEvent) =>
    {
        onChange(ingredientSequence, 'ingredientQuantity', inputEvent.target.value);
    };

    const handleUnitChange = (inputEvent) =>
    {
        onChange(ingredientSequence, 'ingredientUnit', inputEvent.target.value);
    };

    return (
        <div className = 'divRecipeIngredientInput'>
            <input
                placeholder = 'Ingredient'
                className = 'inputRecipeIngredientInput-Text'
                name = { `recipeIngredientName_${ingredientSequence}` }
                disabled = { ingredientName ? true : false }
                defaultValue = { ingredientName }
                onChange = { handleNameChange }
            />

            <input
                min = "1"
                type = 'number'
                placeholder = 'Quantity'
                className = 'inputRecipeIngredientInput-Number'
                name = { `recipeIngredientQuantity_${ingredientSequence}` }
                disabled = { ingredientQuantity ? true : false }
                defaultValue = { ingredientQuantity }
                onChange = { handleQuantityChange }
            />

            <select
                className = 'selectRecipeIngredientInput'
                name = { `recipeIngredientQuantity_${ingredientSequence}` }
                disabled = { ingredientUnit ? true : false }
                defaultValue = { ingredientUnit }
                onChange = { handleUnitChange }
            >
                <option value = 'G'>g</option>
                <option value = 'ML'>ml</option>
            </select>
        </div>
    );
}

export default RecipeIngredientInput;