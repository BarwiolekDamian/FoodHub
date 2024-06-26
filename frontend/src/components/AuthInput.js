import React from 'react';

import '../styles/components/AuthInput.scss';

const AuthInput = ({ labelContent, inputPlaceholder, inputType, inputName, onChange, inputValue }) =>
{
    return (
        <div className = 'divAuthInput'>
            <label className = 'labelAuthInput'>{labelContent}</label>

            <input
                className = 'inputAuthInput'
                onChange = { onChange }
                name = { inputName }
                type = { inputType }
                value = { inputValue }
                placeholder = { inputPlaceholder }
            />
        </div>
    );
}

export default AuthInput;