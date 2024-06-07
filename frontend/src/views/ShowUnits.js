import React, { useEffect } from 'react';
import AppLayout from '../layouts/AppLayout';
import { useNavigate } from 'react-router-dom';
import AuthRouteWrapper from './AuthRouteWrapper';
import useFetchUnits from '../utils/UseFetchUnits';
import useFetchCurrentUser from '../utils/UseFetchCurrentUser';

import '../styles/views/ShowUnits.scss';

const ShowUnits = () =>
{
    const currentUser = useFetchCurrentUser();
    const availableUnits = useFetchUnits();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (currentUser && currentUser.userRole !== 'ADMIN')
        {
            navigateTo('/welcome');
        }
    }, [currentUser, navigateTo]);

    useEffect(() => {}, [availableUnits]);

    if (!currentUser)
        return ( <AppLayout></AppLayout> );

    if (!availableUnits)
        return ( <AppLayout></AppLayout> );

    return (
        <AppLayout>
            <main className = 'mainAppLayout-MainPanel'>
                <div className = 'divAppLayout-HeaderPanel'>
                    <h1 className = 'h1AppLayout-HeaderPanelName'>
                        CONTROL PANEL <span>&#x23F5;</span> SHOW UNITS
                    </h1>
                </div>

                <div className = 'divAppLayout-ContentPanel'>
                    {availableUnits && availableUnits.length > 0 ? (
                        <table className = 'tableShowUnits'>
                            <thead>
                                <tr>
                                    <th>ID:</th>
                                    <th>SYMBOL:</th>
                                    <th>NAME:</th>
                                </tr>
                            </thead>

                            <tbody>
                                {availableUnits.map((currUnit) => (
                                    <tr key = { currUnit.unitId }>
                                        <td>{ currUnit.unitId }</td>
                                        <td>{ currUnit.unitSymbol }</td>
                                        <td>{ currUnit.unitName }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>NO UNITS AVAILABLE.</p>
                    )}
                </div>
            </main>
        </AppLayout>
    );
}

export default AuthRouteWrapper(ShowUnits);