// routes/api/ingredients.js

// Ingredients

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const validateIngredient = require("../../validations/ingredients");
const { requireUser } = require("../../config/passport");
const User = require("../../models/User");
const Ingredient = require("../../models/Ingredient");

//  find the current user and grab their fridge - which is all the ingredients
router.get('/:userId', requireUser, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("fridge");
        if (!user.fridge) {
            return res.json([]); // set fridge to empty array if it's null
        }
        // const ingredients = user.fridge.map((item) => item.name);
        const ingredients = user.fridge;

    return res.json(ingredients);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// adding an ingredient to the current users fridge
router.post("/", requireUser, validateIngredient, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const ingredient = new Ingredient(req.body);
        await ingredient.save();
        user.fridge.push(ingredient._id);
        await user.save();
        return res.json(ingredient);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// router.delete("/:id", requireUser, async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id);
//         const ingredientId = req.params.id;

//         user.fridge = user.fridge.filter(
//             (ingId) => ingId.toString() !== ingredientId
//         );
//         await user.save();

//         const ingredient = await Ingredient.findByIdAndRemove(ingredientId);
//         return res.json(user.fridge);
//     } catch (err) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

router.delete("/:id", requireUser, async (req, res) => {
    try {
        const ingredientId = req.params.id;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { fridge: ingredientId } },
            { new: true, useFindAndModify: false }
        );

        const ingredient = await Ingredient.findById(ingredientId);
        if (!ingredient) {
            return res.status(404).json({ message: "Ingredient not found" });
        }
        await Ingredient.findByIdAndRemove(ingredientId);

        return res.json(user.fridge);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;
