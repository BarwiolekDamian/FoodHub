import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

import '../styles/components/PanelFooter.scss';

const PanelFooter = ({ }) =>
{
    const navigateTo = useNavigate();

    const handleLogout = async () =>
    {
        try
        {
            // Remove Token & Move To Welcome Page
            localStorage.removeItem('authToken');
            navigateTo('/welcome');
        }
        catch(Exception)
        {
            alert('Error Occurred. Try Again Later.');
        }
    }

    return (
        <div className = 'divPanelFooter'>
            <Link to = '/logout'>
                    <button className = 'buttonPanelFooter-Logout' onClick = {handleLogout}>Log Out</button>
            </Link>
        </div>
    );
}

export default PanelFooter;