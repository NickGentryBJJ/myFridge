const express = require("express");
const router = express.Router();
const { default: mongoose } = require("mongoose");
const SavedRecipe = require("../../models/SavedRecipe");
const { requireUser } = require("../../config/passport");
const validateRecipeInput = require("../../validations/recipes");
// const User = mongoose.model("User");
// const validateSavedRecipeInput = require("../../validations/savedRecipes");

//   GET     /api/savedRecipes/
router.get("/", requireUser, async (req, res) => {
    try {
        const savedRecipes = await SavedRecipe.find({ user: req.user._id }); // finding all recipes for logged-in user

        // Convert array to object
        const savedRecipesObject = savedRecipes.reduce((obj, recipe) => {
            obj[recipe._id] = { ...recipe.recipe, _id: recipe._id }; // Copy all properties of recipe and add _id as a property |||||| try note: recipe.note
            return obj;
        }, {});

        return res.json(savedRecipesObject);
    } catch (err) {
        return res.json([]);
    }
});

//* Get savedRecipe by savedRecipeId *//
// router.get("/:savedRecipeId", requireUser, async (req, res, next) => {
//     try {
//         const savedRecipe = await savedRecipe
//             .find(req.params.id)
//             .populate("name", "recipes");
//         return res.json(savedRecipe);
//     } catch (err) {
//         const error = new Error("Recipe not found");
//         error.statusCode = 404;
//         error.errors = { message: "No Recipe found with that id" };
//         return next(error);
//     }
// });

//  POST  /api/savedRecipes/
router.post("/", requireUser, validateRecipeInput, async (req, res, next) => {
    try {
        const newSavedRecipe = new SavedRecipe({
            user: req.user._id,
            recipe: req.body,
            note: req.body.note
        });

        let savedRecipe = await newSavedRecipe.save();
        return res.json(savedRecipe);
    } catch (err) {
        next(err);
    }
});


// DELETE    /api/savedRecipes
router.delete("/", requireUser, async (req, res, next) => {
    try {
        const savedRecipeId = req.body.savedRecipeId;
        await SavedRecipe.findByIdAndDelete(savedRecipeId);
        // TODO: this is not the full return we want
        // res.json({ message: "Recipe deleted successfully!" });
    } catch (err) {
        next(err);
    }
});

// PATCH /api/savedRecipes/:id/note
router.patch("/:id/note", requireUser, async (req, res, next) => {
    // console.log("id", req.params.id)
    // console.log("note", req.body.note)
    try {
        const savedRecipeId = req.params.id;
        const fetchedRecipe = await SavedRecipe.findById(savedRecipeId)
        const newNote = req.body.note;
        const newRecipe = {...fetchedRecipe._doc}
        // console.log("newRecipe", newRecipe)
        newRecipe.recipe.note = newNote

        // Find the saved recipe by id and update its note field
        const savedRecipe = await SavedRecipe.findByIdAndUpdate(savedRecipeId, newRecipe, { new: true });

        if (!savedRecipe) {
            return res.status(404).json({ message: "No saved recipe found with that id" });
        }
        const response = res.json(savedRecipe)
        // console.log(response)
        // return res.json(savedRecipe);
        return response;
    } catch (err) {
        next(err);
    }
});




// DELETE /api/savedRecipes/:id
// router.delete("/:id", requireUser, async (req, res, next) => {
//     try {
//         const savedRecipeId = req.params.id;
//         await SavedRecipe.findByIdAndDelete(savedRecipeId);
//         res.json({ message: "Recipe deleted successfully!" });
//     } catch (err) {
//         next(err);
//     }
// });





module.exports = router;
