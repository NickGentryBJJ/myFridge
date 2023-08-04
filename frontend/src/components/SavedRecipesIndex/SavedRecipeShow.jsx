import React from 'react';
import PostIt from './PostIt';
import './SavedRecipeShow.css';

const SavedRecipeShow = ({ recipe }) => {

    return (
        <div className='saved-recipe-show'>
            <h2>{recipe.name}</h2>
            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <ol>
                {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction.step}. {instruction.description}</li>
                ))}
            </ol>
            <PostIt recipe={recipe} />
        </div>
    );
};

export default SavedRecipeShow;
