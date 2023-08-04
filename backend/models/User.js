const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true, 
            //  there can be many chefs with the same username
        },
        email: {
            type: String,
            required: true,
            unique: true, // make sure its unique
        },
        hashedPassword: {
            type: String,
            required: true,
        }, //fridge is an array of ObjectIds, each of which references an Ingredient
        fridge: [
            {
                type: Schema.Types.ObjectId,
                ref: "Ingredient",
            },
        ], //savedRecipes is an array of ObjectIds, each of which references a Recipe
        savedRecipes: [
            {
                type: Schema.Types.ObjectId,
                ref: "Recipe",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
