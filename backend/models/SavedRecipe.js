const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedRecipeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        recipe: {
            type: Object,
            required: true,
            note: {
                type: String,
                default: "",
            }
        },
        // note: {
        //     type: String,
        //     default: "",
        // },
    },
    {
        timestamps: true,
    }
);

const SavedRecipe = mongoose.model("SavedRecipe", savedRecipeSchema);

module.exports = SavedRecipe;
