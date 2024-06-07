import axios from 'axios';
import { useEffect, useState } from 'react';

const UseFetchCurrentUser = () =>
{
    const [currentUser, setCurrentUser] = useState(null);

    useEffect (() => {
        const authToken = localStorage.getItem('authToken');

        if (authToken)
        {
            axios.get
            (
                'http://localhost:8080/api/user/get/current',
                {
                    params:
                    {
                        Token: authToken
                    }
                }
            )
            .then
            (
                apiResponse =>
                {
                    const responseData = apiResponse.data;

                    // Save Data
                    setCurrentUser
                    ({
                        userId: responseData.Id,
                        userLogin: responseData.Login,
                        userEmail: responseData.Email,
                        userRole: responseData.UserRole,
                        userActive: responseData.Active,

                        userInfo:
                        {
                            imageUrl: responseData.UserInfo.ImageUrl,
                            lastName: responseData.UserInfo.LastName,
                            firstName: responseData.UserInfo.FirstName,
                            phoneNumber: responseData.UserInfo.PhoneNumber,
                            registrationDate: responseData.UserInfo.RegistrationDate
                        }
                    });
                }
            );
        }
    }, []);

    return currentUser;
}

export default UseFetchCurrentUser;