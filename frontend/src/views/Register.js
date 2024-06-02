import axios from 'axios';
import Exception from '../utils/Exception';
import { Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import AuthInput from '../components/AuthInput';
import React, { useState, useEffect } from 'react';
import GuestRouteWrapper from './GuestRouteWrapper';

import '../styles/views/Register.scss';

const Register = () =>
{
    const [authState, setAuthState] = useState
    ({
        userLogin: '',
        userEmail: '',
        userPassword: '',
        userPasswordRepeated: '',
        userFirstName: '',
        userLastName: '',
        isAuthenticated: false
    });

    useEffect (() => { }, [authState]);

    const handleInputBlur = (inputEvent) =>
    {
        const { name, value } = inputEvent.target;

        setAuthState
        ({
            ...authState,
            [name]: value
        });
    };

    const handleFormSubmit = async (formEvent) =>
    {
        formEvent.preventDefault();

        // Retrieve Data
        let { userLogin, userEmail, userPassword, userPasswordRepeated, userFirstName, userLastName } = authState;
        userFirstName = userFirstName.charAt(0).toUpperCase() + userFirstName.slice(1).toLowerCase();
        userLastName = userLastName.charAt(0).toUpperCase() + userLastName.slice(1).toLowerCase();
        userLogin = userLogin.toLowerCase();
        userEmail = userEmail.toLowerCase();

        try
        {
            // Validate Credentials
            validatePasswords(userPassword, userPasswordRepeated);

            // Register User
            await axios.post
            (
                'http://localhost:8080/auth/register',
                {
                    Login: userLogin,
                    Email: userEmail,
                    Password: userPassword,
                    FirstName: userFirstName,
                    LastName: userLastName
                }
            );

            // Successfully Registered - Log In User
            const authResponse = await axios.post
            (
                'http://localhost:8080/auth/login',
                {
                    Login: userLogin,
                    Password: userPassword
                }
            );

            // Successfully Logged In - Save Token
            const authToken = authResponse.data.AuthToken;
            localStorage.setItem('authToken', authToken);

            setAuthState
            ({
                ...authState,
                isAuthenticated: true
            });
        }
        catch(Exception)
        {
            const exceptionCode = Exception.errorCode;

            switch(exceptionCode)
            {
                case 'MISMATCHING_PASSWORDS':
                    alert('Passwords Are Not Identical.');
                    break;
                case 'USER_EXISTS':
                    alert('User With Provided Login Already Exists.');
                    break;
                default:
                    alert('Something Went Wrong.');
                    break;
            }
        }
    }

    const validatePasswords = (firstPassword, secondPassword) =>
    {
        if (firstPassword !== secondPassword)
        {
            throw new Exception('MISMATCHING_PASSWORDS');
        }
    }
    
    if (authState.isAuthenticated)
        return <Navigate to = '/dashboard' />

    return (
        <AuthLayout>
            <section className = 'sectionRegisterLeft'>
                <img src = '/logo.png' alt = 'Logo' className = 'imgRegisterLogo' />
            </section>

            <section className = 'sectionRegisterRight'>
                <h1 className = 'hRegisterGreeting'>Welcome On Board.</h1>

                <form className = 'formRegister' onSubmit = { handleFormSubmit }>
                    <AuthInput
                        inputType = 'text'
                        labelContent = 'First Name'
                        inputName = 'userFirstName'
                        inputPlaceholder = 'Name'
                        onBlur = { handleInputBlur }
                    />

                    <AuthInput
                        inputType = 'text'
                        labelContent = 'Last Name'
                        inputName = 'userLastName'
                        inputPlaceholder = 'Surname'
                        onBlur = { handleInputBlur }
                    />

                    <AuthInput
                        inputType = 'text'
                        labelContent = 'Login'
                        inputName = 'userLogin'
                        inputPlaceholder = 'Login'
                        onBlur = { handleInputBlur }
                    />

                    <AuthInput
                        inputType = 'email'
                        labelContent = 'Email'
                        inputName = 'userEmail'
                        inputPlaceholder = 'Email'
                        onBlur = { handleInputBlur }
                    />

                    <AuthInput
                        inputType = 'password'
                        labelContent = 'Password'
                        inputName = 'userPassword'
                        inputPlaceholder = 'Password'
                        onBlur = { handleInputBlur }
                    />

                    <AuthInput
                        inputType = 'password'
                        labelContent = 'Repeat Password'
                        inputName = 'userPasswordRepeated'
                        inputPlaceholder = 'Password'
                        onBlur = { handleInputBlur }
                    />

                    <button className = 'buttonRegisterAuth' type = 'submit'>Sign Up</button>
                </form>

                <p className = 'pRegisterQuestion'>Already Have An Account? <a href = '/login'>Log In</a>!</p>
            </section>
        </AuthLayout>
    );
}

export default GuestRouteWrapper(Register);