import jwtFetch from './jwt';

// action constants
export const RECEIVE_RECIPES = "recipes/RECEIVE_RECIPES";
export const RECEIVE_RECIPE = "recipes/RECEIVE_RECIPE";

// action creators
const receiveRecipes = (recipes) => {
    return {
        type: RECEIVE_RECIPES,
        recipes: recipes
    }
}

// const receiveRecipe = (recipe) => {
//     return {
//         type: RECEIVE_RECIPE,
//         recipe: recipe
//     }
// }

//getRecipes and getRecipe selector helper functions
export const getRecipe = (recipeId) => (state) => (
    state.recipes ? state.recipes[recipeId] : null
)

export const getRecipes = (state) => (
    state.recipes ? Object.values(state.recipes) : []
)

export const getSavedRecipes = (state) => {
    return state.savedRecipes ? Object.keys(state.savedRecipes) : [];
};

// thunk action creators

export const fetchRecipes = ingredients => async dispatch => {
    try {
        const response = await jwtFetch('/api/recipes/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const recipes = await response.json();
        dispatch(receiveRecipes(recipes));
    } catch (err) {
        dispatch({ type: 'FETCH_RECIPES_FAILURE', payload: err.message });
    }
};







//Recipe Reducer
export default function recipesReducer(state = {}, action) {
    let newState;
    // debugger    

    switch (action.type) {
        case RECEIVE_RECIPES:
            return action.recipes;
        case RECEIVE_RECIPE:  // 
            newState = {...state};
            const recipeId = action.recipe.id;
            newState[recipeId] = action.recipe;
            return newState;
        default:
            return state;
    }
}