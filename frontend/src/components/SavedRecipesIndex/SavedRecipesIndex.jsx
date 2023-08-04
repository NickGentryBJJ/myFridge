import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedRecipes } from "../../store/savedRecipes";
import SavedRecipeIndexItem from "./SavedRecipeIndexItem";
import SavedRecipeShow from "./SavedRecipeShow";
import "./SavedRecipesIndex.css"; // You'll want to create a CSS file for this component

export default function SavedRecipesIndex() {
    const dispatch = useDispatch();
    const savedRecipes = useSelector((state) => state.savedRecipes);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [key, setKey] = useState(Math.random());

    useEffect(() => {
        dispatch(fetchSavedRecipes());
    }, [dispatch, key]);

    const handleRecipeSelect = (recipe) => {
        setSelectedRecipe(recipe);
    };

    // This is to help th rerender of a delete recipe
    // Triggered when the handle submit on IndexItem is clicked and the useffect catches the change above
    // when a selected recipe is delete it will render recipe show now bye setting it
    const handleRecipeDelete = () => {
        setKey(Math.random());
        setSelectedRecipe(null);
    };

    return (
        <div className="saved-recipes-container">
            <div className="recipe-index">
                <h1 id="my-saved-recipes-text">My Saved Recipes</h1>
                {Object.values(savedRecipes).map((recipe, index) => (
                    <SavedRecipeIndexItem
                        key={`recipe-${index}`}
                        recipe={recipe}
                        selectedRecipe={selectedRecipe}
                        setSelectedRecipe={setSelectedRecipe}
                        onRecipeSelect={handleRecipeSelect}
                        onRecipeDelete={handleRecipeDelete}
                    />
                ))}
            </div>
            <div className="recipe-show">
                {selectedRecipe && <SavedRecipeShow recipe={selectedRecipe} />}
            </div>
        </div>
    );
}
