import React from 'react';
import Menu from '../components/Menu.js';
import UserAvatar from '../components/UserAvatar.js';
import PanelFooter from './PanelFooter.js';

import '../styles/components/SidePanel.scss';

const SidePanel = ({ }) =>
{
    return (
        <div className = 'divSidePanel'>
            <UserAvatar />
            <Menu />
            <PanelFooter />
        </div>
    );
}

export default SidePanel;