import React from 'react';

import '../styles/components/EditProfileInput.scss';

const EditProfileInput = ({ labelContent, inputType, inputName, onBlur, inputValue, isDisabled = false }) =>
{
    return (
        <div className = 'divEditProfileInput'>
            <label className = 'labelEditProfileInput'>{labelContent}</label>

            <input
                className = 'inputEditProfileInput'
                onBlur = { onBlur }
                name = { inputName }
                type = { inputType }
                defaultValue = { inputValue }
                disabled = { isDisabled }
            />
        </div>
    );
}

export default EditProfileInput;