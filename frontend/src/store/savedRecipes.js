import jwtFetch from "./jwt";

export const RECIEVE_SAVED_RECIPES = "savedrecipes/RECIEVE_SAVED_RECIPES";
export const RECIEVE_SAVED_RECIPE = "savedrecipes/RECIEVE_SAVED_RECIPE";
export const REMOVE_SAVED_RECIPE = "savedrecipes/REMOVE_SAVED_RECIPE";

// all saved recipes
export const recieveSavedRecipes = (recipes) => {
    return {
        type: RECIEVE_SAVED_RECIPES,
        recipes: recipes,
    };
};

// one saved recipe
export const recieveSavedRecipe = (recipe) => {
    // debugger
    return {
        type: RECIEVE_SAVED_RECIPE,
        recipe: recipe,
    };
};

// TODO: there is no savedrecipe id
export const removeSavedRecipe = (savedRecipeId) => {
    return {
        type: REMOVE_SAVED_RECIPE,
        savedRecipeId,
    };
};

// THUNKS

// GET request for saved recipe index
export const fetchSavedRecipes = () => async (dispatch) => {
    // debugger
    const res = await jwtFetch(`/api/savedRecipes`);

    if (res.ok) {
        // debugger;
        const savedRecipes = await res.json();
        dispatch(recieveSavedRecipes(savedRecipes));
    }
};

// POST to saved recipes
export const createRecipe = (Recipe) => async (dispatch) => {
    // debugger;
    const res = await jwtFetch(`/api/savedRecipes/`, {
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Recipe),
    });

    if (res.ok) {
        // TODO: recipe is undefined  need to unest it
        const recipe = await res.json();
        // debugger;
        dispatch(recieveSavedRecipe(recipe));
    }
};


export const deleteSavedRecipe = (savedRecipeId) => async (dispatch) => {
    const res = await jwtFetch(`/api/savedRecipes/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ savedRecipeId }),
    });

    if (res.ok) {
        dispatch(removeSavedRecipe(savedRecipeId));
    }
};

export const updateSavedRecipeNote = (savedRecipeId, note) => async (dispatch) => {
    // debugger
    const response = await jwtFetch(`/api/savedRecipes/${savedRecipeId}/note`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note })
    })

    if (response.ok) {
        const savedRecipe = await response.json();
        dispatch(recieveSavedRecipe(savedRecipe));
    }
}

// SAVED RECIPE REDUCER
const savedRecipeReducer = (state = {}, action) => {
    Object.freeze(state);
    let newstate;

    switch (action.type) {
        case RECIEVE_SAVED_RECIPES:
            return action.recipes;
        case RECIEVE_SAVED_RECIPE:
            // newstate = {...state}
            // return {...
            // debugger
            return {
                ...state,

                [action.recipe._id]: {...state[action.recipe._id], ...action.recipe.recipe},
                // action.recipe
            };
        case REMOVE_SAVED_RECIPE:
            // TODO: check state or comment out
            newstate = { ...state };
            delete newstate[action.savedRecipeId];
            return newstate;
        default:
            return state;
    }
};

export default savedRecipeReducer;
