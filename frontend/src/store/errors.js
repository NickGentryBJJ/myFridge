// src/store/errors.js

import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { ingredientsErrorsReducer } from './ingredients';

export default combineReducers({
    session: sessionErrorsReducer,
    ingredients: ingredientsErrorsReducer
});
