import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const GuestRouteWrapper = (WrappedContent) =>
{
    const Component = (props) =>
    {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [isLoaded, setIsLoaded] = useState(false);

        useEffect (() => {
            const authToken = localStorage.getItem('authToken');

            if (authToken)
            {
                const currentTime = Date.now() / 1000;
                const decodedToken = jwtDecode(authToken);

                if (decodedToken.exp > currentTime)
                    setIsAuthenticated(true);
                else
                    localStorage.removeItem('authToken');
            }

            setIsLoaded(true);
        }, []);

        if (!isLoaded)
            return null;

        if (!isAuthenticated)
            return <WrappedContent {...props} />;
        else
            return <Navigate to = '/dashboard' />;
    }

    return Component;
}

export default GuestRouteWrapper;