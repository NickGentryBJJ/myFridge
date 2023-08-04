const express = require('express');
const router = express.Router();
const openaiService = require('../../services/openaiService'); // Path may vary based on your file structure

// Route to generate recipe
router.post('/generate', async (req, res) => {
    try {
        const ingredients = req.body.ingredients;
        const recipe = await openaiService.generateRecipe(ingredients);
        res.json({ recipe: recipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while generating the recipe.' });
    }
});

module.exports = router;
