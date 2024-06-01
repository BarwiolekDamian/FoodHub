import React from 'react';

import '../styles/components/UserAvatar.scss';

const UserAvatar = ({ fullName = 'Damian Barwiołek', imageSrc = 'test.jpeg', userLogin = 'dbarwiolek1' }) =>
{
    return (
        <div className = 'divUserAvatar'>
            <img className = 'imgUserAvatar-UserImage' alt = 'Avatar' src = {imageSrc} />

            <h3 className = 'h3UserAvatar-FullName'>{fullName}</h3>

            <p className = 'pUserAvatar-UserLogin'>@{userLogin}</p>
        </div>
    );
}

export default UserAvatar;