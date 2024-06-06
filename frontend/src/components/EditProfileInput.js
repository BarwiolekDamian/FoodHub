import React from 'react';

import '../styles/components/EditProfileInput.scss';

const EditProfileInput = ({ labelContent, inputType, inputName, onChange, inputValue, isDisabled = false }) =>
{
    return (
        <div className = 'divEditProfileInput'>
            <label className = 'labelEditProfileInput'>{labelContent}</label>

            <input
                className = 'inputEditProfileInput'
                onChange = { onChange }
                name = { inputName }
                type = { inputType }
                defaultValue = { inputValue }
                disabled = { isDisabled }
            />
        </div>
    );
}

export default EditProfileInput;