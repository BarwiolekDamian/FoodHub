import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../images/logo.png';
import AuthLayout from '../layouts/AuthLayout';
import GuestRouteWrapper from './GuestRouteWrapper';

import '../styles/views/Welcome.scss';

const Welcome = () =>
{
    return (
        <AuthLayout>
            <main className = 'mainWelcome'>
                <div className = 'divWelcomeLogo'>
                    <img src = {Logo} alt = 'Logo' className = 'imgWelcomeLogo' />
                    <h1 className = 'hWelcomeLogo'>FoodHub</h1>
                </div>

                <Link to = '/login'>
                    <button className = 'buttonWelcomeAuth'>Log In</button>
                </Link>

                <Link to = '/register'>
                    <button className = 'buttonWelcomeAuth'>Sign Up</button>
                </Link>
            </main>
        </AuthLayout>
    );
}

export default GuestRouteWrapper(Welcome);