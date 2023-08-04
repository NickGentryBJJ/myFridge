// store/store.js

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import errors from "./errors";
import recipesReducer from "./recipes";
import ingredientsReducer from "./ingredients";
import savedRecipeReducer from "./savedRecipes";

const rootReducer = combineReducers({
    session,
    errors,
    recipes: recipesReducer,
    ingredients: ingredientsReducer,
    savedRecipes: savedRecipeReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require("redux-logger").default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
