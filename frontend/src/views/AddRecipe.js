import axios from 'axios';
import React, { useState } from 'react';
import Exception from '../utils/Exception';
import AppLayout from '../layouts/AppLayout';
import { useNavigate } from 'react-router-dom';
import AuthRouteWrapper from './AuthRouteWrapper';
import RecipeMainInput from '../components/RecipeMainInput';
import RecipeStepInput from '../components/RecipeStepInput';
import useFetchCurrentUser from '../utils/UseFetchCurrentUser';
import RecipeIngredientInput from '../components/RecipeIngredientInput';

import '../styles/views/RecipeView.scss';

const AddRecipe = ({ accessType }) =>
{
    const navigateTo = useNavigate();
    const currentUser = useFetchCurrentUser();
    const [recipeSteps, setRecipeSteps] = useState([]);
    const [recipeIngredients, setRecipeIngredients] = useState([]);

    const [recipeInfo, setRecipeInfo] = useState
    ({
        imageFile: null,
        recipeTitle: null,
        recipeImageUrl: null,
        recipeDescription: null
    });

    const addStep = () =>
    {
        const newStepSequence = recipeSteps.length + 1;

        setRecipeSteps
        ([
            ...recipeSteps,
            {
                sequenceNumber: newStepSequence,
                stepContent: null
            }
        ])
    };

    const addIngredient = () =>
    {
        const newIngredientSequence = recipeIngredients.length + 1;

        setRecipeIngredients
        ([
            ...recipeIngredients,
            {
                sequenceNumber: newIngredientSequence,
                ingredientQuantity: null,
                ingredientName: null,
                ingredientUnit: 'G'
            }
        ])
    };

    const handleInfoChange = (inputEvent) =>
    {
        const { name, value } = inputEvent.target;

        setRecipeInfo
        ({
            ...recipeInfo,
            [name]: value
        });
    };

    const handleImageChange = (imageObj) =>
    {
        const imageFile = imageObj.target.files[0];
        const fileReader = new FileReader();

        fileReader.onloadend = () =>
        {
            setRecipeInfo
            ({
                ...recipeInfo,
                imageFile: imageFile,
                recipeImageUrl: fileReader.result
            });
        };

        if (imageFile)
        {
            fileReader.readAsDataURL(imageFile);
        }
    };

    const handleStepChange = (sequenceNumber, stepValue) =>
    {
        setRecipeSteps
        (
            prevSteps => prevSteps.map
            (currentStep => 
                currentStep.sequenceNumber === sequenceNumber
                ? { ...currentStep, stepContent: stepValue }
                : currentStep
            )
        )
    };

    const handleIngredientChange = (sequenceNumber, fieldName, ingredientValue) =>
    {
        setRecipeIngredients
        (
            prevIngredients => prevIngredients.map
            (currentIngredient => 
                currentIngredient.sequenceNumber === sequenceNumber
                ? { ...currentIngredient, [fieldName]: ingredientValue }
                : currentIngredient
            )
        )
    };

    const handleFormSubmit = async (formEvent) =>
    {
        formEvent.preventDefault();

        try
        {
            // Validate Data
            validateRecipeInfo(recipeInfo);
            let validSteps = validateRecipeSteps(recipeSteps);
            let validIngredients = validateRecipeIngredients(recipeIngredients);

            // Add Recipe
            const apiResponse = await axios.post
            (
                'http://localhost:8080/api/recipe/add',
                {
                    UserId: currentUser.userId,
                    RecipeSteps: validSteps,
                    RecipeAccess: accessType,
                    RecipeIngredients: validIngredients,
                    RecipeTitle: recipeInfo.recipeTitle,
                    RecipeDescription: recipeInfo.recipeDescription
                }
            );

            // Upload Recipe Image
            if (recipeInfo.imageFile)
            {
                const formData = new FormData();
                formData.append('File', recipeInfo.imageFile);

                axios.put
                (
                    `http://localhost:8080/api/recipe-info/update/${apiResponse.data.Id}/image`, formData,
                    {
                        headers:
                        {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
            }

            // Successfully Added - Send Confirmation Alert
            alert('Recipe Successfully Added.');
            navigateTo(`/recipe/${apiResponse.data.Id}`);
        }
        catch(Exception)
        {
            const exceptionCode = Exception.errorCode;

            switch(exceptionCode)
            {
                case 'EMPTY_TITLE':
                    alert('Mandatory Field Title Is Incorrect.');
                    break;
                case 'INVALID_TITLE':
                    alert('Provided Title Is Incorrect.');
                    break;
                case 'EMPTY_RECIPE_STEPS':
                    alert('You Have To Provide Recipe Steps.');
                    break;
                case 'EMPTY_RECIPE_INGREDIENTS':
                    alert('You Have To Provide Recipe Ingredients.');
                    break;
                case 'INVALID_STEP_DATA':
                    alert('Atleast One Internal Step Contains Empty Values.');
                    break;
                case 'INVALID_INGREDIENT_DATA':
                    alert('Atleast One Internal Ingredient Contains Empty Values.');
                    break;
                default:
                    alert('Something Went Wrong.');
                    break;
            }
        }
    };

    const validateRecipeInfo = (recipeInfo) =>
    {
        const { recipeTitle } = recipeInfo;

        if (recipeTitle === null || recipeTitle.length < 10)
        {
            throw new Exception('INVALID_TITLE');
        }
    }

    const validateRecipeSteps = (recipeSteps) =>
    {
        let lastIndex = recipeSteps.length - 1;
        let validSteps = [];

        // Retrieve Array Last Index
        while (lastIndex >= 0 && !recipeSteps[lastIndex].stepContent)
        {
            lastIndex--;
        }

        if (lastIndex < 0)
            throw new Exception('EMPTY_RECIPE_STEPS');

        // Check Data
        let tempArray = recipeSteps.slice(0, lastIndex + 1);

        for (let loopIndex = 0; loopIndex < tempArray.length; loopIndex++)
        {
            let currentStep = tempArray[loopIndex];

            if (!currentStep.stepContent)
            {
                throw new Exception('INVALID_STEP_DATA');
            }

            // Assign New Record
            validSteps.push
            ({
                Content: currentStep.stepContent,
                SequenceNumber: currentStep.sequenceNumber
            })
        }

        // Return Validated Steps
        return validSteps;
    }

    const validateRecipeIngredients = (recipeIngredients) =>
    {
        let lastIndex = recipeIngredients.length - 1;
        let validIngredients = [];

        // Retrieve Array Last Index
        while (lastIndex >= 0 && (!recipeIngredients[lastIndex].ingredientQuantity && !recipeIngredients[lastIndex].ingredientName && !recipeIngredients[lastIndex].ingredientUnit))
        {
            lastIndex--;
        }

        if (lastIndex < 0)
            throw new Exception('EMPTY_RECIPE_INGREDIENTS');

        // Check Data
        let tempArray = recipeIngredients.slice(0, lastIndex + 1);

        for (let loopIndex = 0; loopIndex < tempArray.length; loopIndex++)
        {
            let currentIngredient = tempArray[loopIndex];

            if (!currentIngredient.ingredientName || !currentIngredient.ingredientUnit || !currentIngredient.ingredientQuantity)
            {
                throw new Exception('INVALID_INGREDIENT_DATA');
            }

            // Assign New Record
            validIngredients.push
            ({
                Custom: true,
                Name: currentIngredient.ingredientName,
                Unit: currentIngredient.ingredientUnit,
                Quantity: currentIngredient.ingredientQuantity
            })
        }

        // Return Validated Ingredients
        return validIngredients;
    }

    return (
        <AppLayout>
            <main className = 'mainAppLayout-MainPanel'>
                <div className = 'divAppLayout-HeaderPanel'>
                    <h1 className = 'h1AppLayout-HeaderPanelName'>
                        ADD RECIPE <span>&#x23F5;</span> ADD { accessType } RECIPE
                    </h1>
                </div>

                <div className = 'divAppLayout-ContentPanel'>
                    <form className = 'formRecipe-Main'>
                        <h1 className = 'h1Recipe-SectionTitle'>BASIC:</h1>

                        <RecipeMainInput
                            inputType = 'text'
                            labelContent = 'Title'
                            inputName = 'recipeTitle'
                            onChange = { handleInfoChange }
                        />

                        <RecipeMainInput
                            inputType = 'textarea'
                            labelContent = 'Description'
                            inputName = 'recipeDescription'
                            onChange = { handleInfoChange }
                        />

                        <RecipeMainInput
                            inputType = 'file'
                            labelContent = 'Image'
                            inputName = 'recipeImage'
                            onChange = { handleImageChange }
                        />
                    </form>

                    <form className = 'formRecipe-Ingredients'>
                        <h1 className = 'h1Recipe-SectionTitle'>INGREDIENTS:</h1>
                        <button className = 'buttonRecipeDetails-AddElement' onClick = { addIngredient } type = 'button'>+ ADD</button>

                        {recipeIngredients.map((_, arrayIndex) => (
                            <RecipeIngredientInput
                                key = { `Ingredient_${arrayIndex + 1}` }
                                ingredientSequence = { arrayIndex + 1 }
                                onChange = { handleIngredientChange }
                            />
                        ))}
                    </form>

                    <form className = 'formRecipe-Steps'>
                        <h1 className = 'h1Recipe-SectionTitle'>STEPS:</h1>
                        <button className = 'buttonRecipeDetails-AddElement' onClick = { addStep } type = 'button'>+ ADD</button>

                        {recipeSteps.map((_, arrayIndex) => (
                            <RecipeStepInput
                                key = { `Step_${arrayIndex + 1}` }
                                stepSequence = { arrayIndex + 1 }
                                onChange = { handleStepChange }
                            />
                        ))}
                    </form>

                    <button className = 'buttonRecipe-SaveRecipe' onClick = { handleFormSubmit }>
                        SAVE
                    </button>
                </div>
            </main>
        </AppLayout>
    );
}

export default AuthRouteWrapper(AddRecipe);