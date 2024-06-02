import React from 'react';
import Menu from '../components/Menu.js';
import PanelFooter from './PanelFooter.js';
import UserAvatar from '../components/UserAvatar.js';
import useFetchCurrentUser from '../utils/UseFetchCurrentUser';

import '../styles/components/SidePanel.scss';

const SidePanel = () =>
{
    const currentUser = useFetchCurrentUser();

    return (
        <div className = 'divSidePanel'>
            <UserAvatar
                userLogin = {currentUser?.userLogin || ''}
                imageSrc = {currentUser?.userInfo?.imageUrl || ''}
                fullName = {currentUser?.userInfo?.firstName && currentUser?.userInfo?.lastName ? currentUser.userInfo.firstName + ' ' + currentUser.userInfo.lastName : ''}
            />

            <Menu />
            <PanelFooter />
        </div>
    );
}

export default SidePanel;