import React, { useState, useRef, useEffect } from 'react';

import '../styles/components/Menu.scss';

const Menu = () =>
{
    const [activeIndex, setActiveIndex] = useState(null);
    const panelsRef = useRef([]);

    const handleButtonClick = (indexObj) =>
    {
        if (activeIndex === indexObj)
            setActiveIndex(null);
        else
            setActiveIndex(indexObj);
    };

    useEffect (() => {
        if (activeIndex !== null)
        {
            panelsRef.current.forEach((panelObj, indexObj) => {
                if (panelObj)
                {
                    if (indexObj === activeIndex)
                        panelObj.style.maxHeight = panelObj.scrollHeight + 'px';
                    else
                        panelObj.style.maxHeight = '0';
                }
            });
        }
        else
        {
            panelsRef.current.forEach((panelObj) => {
                if (panelObj)
                    panelObj.style.maxHeight = '0';
            });
        }
    }, [activeIndex]);

    return (
        <nav className = 'navMenu'>
            <ul className = 'ulMenu'>
                <li className = 'liMenu-CategoryPanel'>
                    <a href = '/dashboard'>DASHBOARD</a>
                </li>

                <li className = 'liMenu-CategoryPanel'>
                    <button className = 'buttonMenu-CategoryPanel' onClick = {() => handleButtonClick(0)}>
                        RECIPES
                        <span className = {`spanMenu-Arrow ${activeIndex === 0 ? 'rotateArrow' : ''}`}>&#x23F7;</span>
                    </button>

                    <ul className = 'ulMenu-ItemsPanel' ref = {(refElement) => (panelsRef.current[0] = refElement)}>
                        <li className = 'liMenu-SubItem'>
                            <a href = '/my-private-recipes'>PRIVATE RECIPES</a>
                        </li>

                        <li className = 'liMenu-SubItem'>
                            <a href = '/my-observed-recipes'>OBSERVED RECIPES</a>
                        </li>
                    </ul>
                </li>

                <li className = 'liMenu-CategoryPanel'>
                    <button className = 'buttonMenu-CategoryPanel' onClick = {() => handleButtonClick(1)}>
                        ADD RECIPE
                        <span className = {`spanMenu-Arrow ${activeIndex === 1 ? 'rotateArrow' : ''}`}>&#x23F7;</span>
                    </button>

                    <ul className = 'ulMenu-ItemsPanel' ref = {(refElement) => (panelsRef.current[1] = refElement)}>
                        <li className = 'liMenu-SubItem'>
                            <a href = '/add-private-recipe'>ADD PRIVATE RECIPE</a>
                        </li>

                        <li className = 'liMenu-SubItem'>
                            <a href = '/add-public-recipe'>ADD PUBLIC RECIPE</a>
                        </li>
                    </ul>
                </li>

                <li className = 'liMenu-CategoryPanel'>
                    <button className = 'buttonMenu-CategoryPanel' onClick = {() => handleButtonClick(2)}>
                        COMMUNITY
                        <span className = {`spanMenu-Arrow ${activeIndex === 2 ? 'rotateArrow' : ''}`}>&#x23F7;</span>
                    </button>

                    <ul className = 'ulMenu-ItemsPanel' ref = {(refElement) => (panelsRef.current[2] = refElement)}>
                        <li className = 'liMenu-SubItem'>
                            <a href = '/browse-public-recipes'>BROWSE RECIPES</a>
                        </li>

                        <li className = 'liMenu-SubItem'>
                            <a href = '/my-public-recipes'>PUBLISHED RECIPES</a>
                        </li>
                    </ul>
                </li>

                <li className = 'liMenu-CategoryPanel'>
                    <button className = 'buttonMenu-CategoryPanel' onClick = {() => handleButtonClick(3)}>
                        PROFILE
                        <span className = {`spanMenu-Arrow ${activeIndex === 3 ? 'rotateArrow' : ''}`}>&#x23F7;</span>
                    </button>

                    <ul className = 'ulMenu-ItemsPanel' ref = {(refElement) => (panelsRef.current[3] = refElement)}>
                        <li className = 'liMenu-SubItem'>
                            <a href = '/edit-profile'>EDIT PROFILE</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;