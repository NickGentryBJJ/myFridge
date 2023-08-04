import React, { useState, useEffect } from "react";
import StepItem from "./StepItem";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../../store/savedRecipes";

import "./StepItem.css";

export default function RecipeMainShow({ recipe }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const [isSaved, setSaved] = useState(false);

    useEffect(() => {
        setSaved(false);
    }, [recipe]);


    const handleClick = (e) => {
        e.preventDefault();

        const savedRecipe = {
            user: currentUser._id,

            ...recipe,
        };
        dispatch(createRecipe(savedRecipe));
        setSaved(true);
    };


    return (
        <div className="recipe-main-show-wrapper">
            <ul className="recipe-main-steps">
                {recipe.instructions.map((step) => (
                    <li className="step-item-recipt-left">
                        <StepItem step={step} />
                    </li>
                ))}
                {!isSaved ? (
            <button className="save-button" onClick={handleClick}>Save Recipe</button>
            ) : (
            <button id="saved-button" disabled>Saved</button>
        )}
            </ul>
        </div>
    );
}
