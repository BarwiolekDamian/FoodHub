import React from 'react';

import '../styles/components/RecipeStepInput.scss';

const RecipeStepInput = ({ stepSequence, inputValue, onChange }) =>
{
    const handleChange = (inputEvent) =>
    {
        onChange(stepSequence, inputEvent.target.value);
    };

    return (
        <div className = 'divRecipeStepInput'>
            <label className = 'labelRecipeStepInput'>{ `Step ${stepSequence}` }</label>

            <textarea
                className = 'textareaRecipeStepInput'
                disabled = { inputValue ? true : false }
                defaultValue = { inputValue }
                name = { `recipeStep_${stepSequence}` }
                maxLength = '1500'
                onChange = { handleChange }
            />
        </div>
    );
}

export default RecipeStepInput;