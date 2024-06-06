import axios from 'axios';
import Exception from '../utils/Exception';
import AppLayout from '../layouts/AppLayout';
import AuthRouteWrapper from './AuthRouteWrapper';
import React, { useEffect, useState } from 'react';
import EditProfileInput from '../components/EditProfileInput';
import useFetchCurrentUser from '../utils/UseFetchCurrentUser';

import '../styles/views/EditProfile.scss';

const EditProfile = () =>
{
    const currentUser = useFetchCurrentUser();

    const [modifiedData, setModifiedData] = useState
    ({
        imageFile: null,
        userImageUrl: null,
        userLastName: null,
        userFirstName: null,
        userPhoneNumber: null
    });

    // 'UseEffect' -> Retrieve Image When User Is Loaded
    useEffect (() => {
        if (currentUser && currentUser.userInfo.imageUrl !== null)
        {
            setModifiedData
            ({
                ...modifiedData,
                userImageUrl: 'http://localhost:8080/' + currentUser.userInfo.imageUrl
            });
        }
    }, [currentUser]);

    const handleInputChange = (inputEvent) =>
    {
        const { name, value } = inputEvent.target;

        setModifiedData
        ({
            ...modifiedData,
            [name]: value
        });
    };

    const handleImageChange = (imageObj) =>
    {
        const imageFile = imageObj.target.files[0];
        const fileReader = new FileReader();

        fileReader.onloadend = () =>
        {
            setModifiedData
            ({
                ...modifiedData,
                imageFile: imageFile,
                userImageUrl: fileReader.result
            });
        };

        if (imageFile)
        {
            fileReader.readAsDataURL(imageFile);
        }
    };

    const handleFormSubmit = async (formEvent) =>
    {
        formEvent.preventDefault();

        // Retrieve Data
        let { imageFile, userLastName, userFirstName, userPhoneNumber } = modifiedData;

        if (userLastName === null) { userLastName = currentUser.userInfo.lastName; }
        if (userFirstName === null) { userFirstName = currentUser.userInfo.firstName; }
        userLastName = userLastName.charAt(0).toUpperCase() + userLastName.slice(1).toLowerCase();
        userFirstName = userFirstName.charAt(0).toUpperCase() + userFirstName.slice(1).toLowerCase();

        try
        {
            // Validate Inputs
            validatePhoneNumber(userPhoneNumber);
            validateFirstName(userFirstName);
            validateLastName(userLastName);

            // Upload User Avatar
            if (imageFile)
            {
                const formData = new FormData();
                formData.append('File', imageFile);

                await axios.put
                (
                    `http://localhost:8080/api/user-info/update/${currentUser.userId}/avatar`, formData,
                    {
                        headers:
                        {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
            }

            // Upload User Info
            await axios.put
            (
                `http://localhost:8080/api/user-info/update/${currentUser.userId}`,
                {
                    PhoneNumber: userPhoneNumber,
                    FirstName: userFirstName,
                    LastName: userLastName
                }
            );

            // Successfully Modified - Send Confirmation Alert
            window.location.reload();
            alert('Profile Successfully Saved.');
        }
        catch(Exception)
        {
            const exceptionCode = Exception.errorCode;

            switch(exceptionCode)
            {
                case 'INVALID_NAME':
                    alert("Provided 'First Name' Is Incorrect.");
                    break;
                case 'INVALID_SURNAME':
                    alert("Provided 'Last Name' Is Incorrect.");
                    break;
                case 'INVALID_PHONE_NUMBER':
                    alert("Provided 'Phone Number' Is Incorrect.");
                    break;
                default:
                    alert('Something Went Wrong.');
                    break;
            }
        }
    };

    const validateFirstName = (firstName) =>
    {
        if (firstName.length < 3)
        {
            throw new Exception('INVALID_NAME');
        }
    }

    const validateLastName = (lastName) =>
    {
        if (lastName.length < 3)
        {
            throw new Exception('INVALID_SURNAME');
        }
    }

    const validatePhoneNumber = (phoneNumber) =>
    {
        if (phoneNumber && phoneNumber.toString().length !== 9)
        {
            throw new Exception('INVALID_PHONE_NUMBER');
        }
    }

    return (
        <AppLayout>
            <main className = 'mainAppLayout-MainPanel'>
                <div className = 'divAppLayout-HeaderPanel'>
                    <h1 className = 'h1AppLayout-HeaderPanelName'>
                        PROFILE <span>&#x23F5;</span> EDIT PROFILE
                    </h1>
                </div>

                <div className = 'divAppLayout-ContentPanel'>
                    <div className = 'divEditProfile'>
                        <form className = 'formEditProfile' onSubmit = { handleFormSubmit }>
                            <div className='divProfileImage'>
                                <img
                                    src = {modifiedData?.userImageUrl ? modifiedData.userImageUrl : '/default-avatar.png'}
                                    className = 'imgProfileImage'
                                    alt = ''
                                />

                                <label htmlFor = 'profileImageUpload' className = 'labelProfileImage'>
                                    Change Photo
                                </label>

                                <input
                                    id = 'profileImageUpload'
                                    type = 'file'
                                    accept = 'image/png'
                                    className = 'inputProfileImage'
                                    onChange = { handleImageChange }
                                />
                            </div>

                            <EditProfileInput
                                inputType = 'text'
                                labelContent = 'Login'
                                inputName = 'userLogin'
                                inputValue = { currentUser?.userLogin ? currentUser.userLogin : '' }
                                onChange = { handleInputChange }
                                isDisabled = { true }
                            />

                            <EditProfileInput
                                inputType = 'email'
                                labelContent = 'Email'
                                inputName = 'userEmail'
                                inputValue = { currentUser?.userEmail ? currentUser.userEmail : '' }
                                onChange = { handleInputChange }
                                isDisabled = { true }
                            />

                            <EditProfileInput
                                inputType = 'text'
                                labelContent = 'First Name'
                                inputName = 'userFirstName'
                                inputValue = { currentUser?.userInfo?.firstName ? currentUser.userInfo.firstName : '' }
                                onChange = { handleInputChange }
                            />

                            <EditProfileInput
                                inputType = 'text'
                                labelContent = 'Last Name'
                                inputName = 'userLastName'
                                inputValue = { currentUser?.userInfo?.lastName ? currentUser.userInfo.lastName : '' }
                                onChange = { handleInputChange }
                            />

                            <EditProfileInput
                                inputType = 'number'
                                labelContent = 'Phone Number'
                                inputName = 'userPhoneNumber'
                                inputValue = { currentUser?.userInfo?.phoneNumber ? currentUser.userInfo.phoneNumber : '' }
                                onChange = { handleInputChange }
                            />

                            <button className = 'buttonEditProfile-SaveChanges' type = 'submit'>
                                SAVE CHANGES
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}

export default AuthRouteWrapper(EditProfile);