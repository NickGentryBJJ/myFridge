import React  from "react";
import { useState, useEffect } from "react";
import { createIngredient, fetchIngredients, getIngredients } from "../../store/ingredients";
import { useDispatch, useSelector } from "react-redux";
import './Fridge.css'

export default function Fridge (userId) {
    const sessionUser = useSelector(state => state.session.user);
    const errors = useSelector(state => state.errors.ingredients);

    const [ingredients, setIngredients] = useState("")
    const dispatch = useDispatch();
    const ings = useSelector(state => state.ingredients) || [];


    const eliminateDups = (ing) => {
        for (let i = 0; i < ings.length; i++) {
            const ingredient = ings[i];
            if (ingredient.name.toLowerCase() === ing.toLowerCase()) {
                return false
            }
        }
        return true
    }

    const handleInputChange = (e) => {
        setIngredients(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const lowerCaseIngredients = ingredients.toLowerCase();
            if (eliminateDups(ingredients) !== false) {
                dispatch(createIngredient(sessionUser, lowerCaseIngredients));
            } else {
                dispatch(createIngredient(sessionUser, ""));
            }
            setIngredients("");
    };

    return (
        <div className="fridge-wrapper">
            <div className="add-to-fridge-form-wrapper">
                <form className="add-to-fridge-form" onSubmit={handleSubmit}>
                    <label id="add-ingredients-fridge-label">Add ingredient:</label>
                    <input className="input-fridge-form"
                        type="text"
                        id="ingredients"
                        name="ingredients"
                        value={ingredients}
                        onChange={handleInputChange}
                    />
                    <button className="add-to-fridge-button" type="submit">Add to myFridge!</button>
                    <div className="errors">{errors?.name}</div>
                </form>
            </div>
        </div>
    )
}
