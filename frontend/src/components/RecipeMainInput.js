import React from 'react';

import '../styles/components/RecipeMainInput.scss';

const RecipeMainInput = ({ inputType = 'text', labelContent, inputName, onChange, inputValue }) =>
{
    return (
        <div className = 'divRecipeMainInput'>
            <label className = 'labelRecipeMainInput'>{ labelContent }</label>

            {
                inputType == 'textarea' ?
                (
                    <textarea
                        className = 'textareaRecipeMainInput-Description'
                        disabled = { inputValue ? true : false }
                        defaultValue = { inputValue }
                        type = { inputType }
                        name = { inputName }
                        onChange = { onChange }
                        maxLength = '1000'
                    />
                ) :
                (
                    <input
                        accept = { inputType === 'file' ? 'image/png' : undefined }
                        className = 'inputRecipeMainInput-Text_Image'
                        disabled = { inputValue ? true : false }
                        defaultValue = { inputValue }
                        type = { inputType }
                        name = { inputName }
                        onChange = { onChange }
                    />
                )
            }
        </div>
    );
}

export default RecipeMainInput;