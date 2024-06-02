import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import AuthRouteWrapper from './AuthRouteWrapper';

const Dashboard = () =>
{
    const navigateTo = useNavigate();

    // useEffect (() => { navigateTo('/test') });

    return (
        <AppLayout></AppLayout>
    );
}

export default AuthRouteWrapper(Dashboard);