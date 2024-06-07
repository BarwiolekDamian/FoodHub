import axios from 'axios';
import { useEffect, useState } from 'react';

const UseFetchUnits = () =>
{
    const [availableUnits, setAvailableUnits] = useState([]);

    useEffect (() => {
        axios.get
        (
            `http://localhost:8080/api/unit/get/all`, {}
        )
        .then
        (
            apiResponse =>
            {
                const responseData = apiResponse.data;

                if (responseData && Array.isArray(responseData))
                {
                    const fetchedUnits = responseData.map
                    (
                        // Create Element
                        currUnit =>
                        ({
                            unitId: currUnit.Id,
                            unitName: currUnit.Name,
                            unitSymbol: currUnit.Symbol
                        })
                    );

                    // Save Data
                    setAvailableUnits(fetchedUnits);
                }
                else
                {
                    // Save Data
                    setAvailableUnits([]);
                }
            }
        );
    }, []);

    return availableUnits;
}

export default UseFetchUnits;