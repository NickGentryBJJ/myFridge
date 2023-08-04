// validations/notes.js

const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');


const validateNote = [
    check('body')
        .exists({checkFalsy: true})
        .isLength({ max: 250 }),
        handleValidationErrors,
];

module.exports = validateNote;