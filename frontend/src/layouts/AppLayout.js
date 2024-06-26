import React from 'react';
import SidePanel from '../components/SidePanel.js';
import '../styles/layouts/AppLayout.scss';

const AppLayout = ({ children }) =>
{
    return (
        <div className = 'divAppLayout'>
            <SidePanel />
            {children}
        </div>
    );
}

export default AppLayout;