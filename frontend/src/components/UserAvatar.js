import React, { useEffect } from 'react';

import '../styles/components/UserAvatar.scss';

const UserAvatar = ({ fullName, imageSrc, userLogin }) =>
{
    return (
        <div className = 'divUserAvatar'>
            <img className = 'imgUserAvatar-UserImage' src = { imageSrc ? `http://localhost:8080/${imageSrc}` : 'default-avatar.png' } />

            <h3 className = 'h3UserAvatar-FullName'>{ fullName ? `${fullName}` : '' }</h3>

            <p className = 'pUserAvatar-UserLogin'>{ userLogin ? `@${userLogin}` : '' }</p>
        </div>
    );
}

export default UserAvatar;