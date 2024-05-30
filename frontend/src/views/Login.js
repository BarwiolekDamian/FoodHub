import axios from 'axios';
import Logo from '../images/logo.png';
import { Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import AuthInput from '../components/AuthInput';
import React, { useState, useEffect } from 'react';
import GuestRouteWrapper from './GuestRouteWrapper';

import '../styles/views/Login.scss';

const Login = () =>
{
    const [authState, setAuthState] = useState
    ({
        userLogin: '',
        userPassword: '',
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
        let { userLogin, userPassword } = authState;
        userLogin = userLogin.toLowerCase();

        try
        {
            // Log In User
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
        catch (Exception)
        {
            const exceptionCode = Exception.errorCode;

            switch(exceptionCode)
            {
                case 'UNKNOWN_USER':
                    alert('Provided User Doesn\'t Exist.');
                    break;
                default:
                    alert('Incorrect Credentials.');
                    break;
            }
        }
    };

    if (authState.isAuthenticated)
        return <Navigate to = '/dashboard' />

    return (
        <AuthLayout>
            <section className = 'sectionLoginLeft'>
                <h1 className = 'hLoginGreeting'>Welcome Back.</h1>

                <form className = 'formLogin' onSubmit = { handleFormSubmit }>
                    <AuthInput
                        inputType = 'text'
                        labelContent = 'Login'
                        inputName = 'userLogin'
                        inputPlaceholder = 'Login'
                        value = { authState.userLogin }
                        onBlur = { handleInputBlur }
                    />

                    <AuthInput
                        inputType = 'password'
                        labelContent = 'Password'
                        inputName = 'userPassword'
                        inputPlaceholder = 'Password'
                        value = { authState.userPassword }
                        onBlur = { handleInputBlur }
                    />

                    <button className = 'buttonLoginAuth' type = 'submit'>Log In</button>
                </form>

                <p className = 'pLoginQuestion'>Don't Have An Account? <a href = '/register'>Sign Up</a>!</p>
            </section>

            <section className = 'sectionLoginRight'>
                <img src = {Logo} alt = 'Logo' className = 'imgLoginLogo' />
            </section>
        </AuthLayout>
    );
}

export default GuestRouteWrapper(Login);