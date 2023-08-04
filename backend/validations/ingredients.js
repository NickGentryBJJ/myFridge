// validations/ingredients.js

const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');


const validateIngredient = [
    check('name')
        .exists({checkFalsy: true})
        .withMessage('Cannot add duplicate or blank ingredients'),
        handleValidationErrors
];

module.exports = validateIngredient;