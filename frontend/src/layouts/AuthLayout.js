import React from 'react';

import '../styles/layouts/AuthLayout.scss'

const AuthLayout = ({ children }) =>
{
    return (
        <div className = 'divAuthLayout'>
            {children}
        </div>
    );
}

export default AuthLayout;