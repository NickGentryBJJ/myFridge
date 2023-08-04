const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateSavedRecipeInput = [
    check("name")
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("name is required"),
    handleValidationErrors,

    check("recipes")
        .exists({ checkFalsy: true })
        .isArray({ min: 1 })
        .withMessage("savedRecipe Recipes required"),
    handleValidationErrors,
];

module.exports = validateSavedRecipeInput;
