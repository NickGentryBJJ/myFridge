

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient',
            required: true
        }
    ],
    instructions: [
        {
            step: {
                type: Number,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            body: String
        }
    ],
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);

