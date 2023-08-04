// validations/recipes.js

const { check, validationResult } = require("express-validator");

const validateRecipeInput = [
    check('name')
        .exists({checkFalsy: true})
        .withMessage('Name is required'),

    check('ingredients')
        .exists({checkFalsy: true})
        .isArray()
        .withMessage('Ingredients are required and should be an array'),

    check('instructions')
        .exists({checkFalsy: true})
        .isArray()
        .withMessage('Instructions are required and should be an array'),

    check('instructions.*.step')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Step number is required and it should be a number'),

    check('instructions.*.description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),

    // Call custom middleware function after all checks
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation Error",
                statusCode: 400,
                errors: errors.array(),
            });
        }
        next();
    }
];

module.exports = validateRecipeInput;