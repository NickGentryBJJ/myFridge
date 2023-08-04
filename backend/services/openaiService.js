const axios = require("axios");

const openai = axios.create({
    baseURL: "https://api.openai.com",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
});

exports.generateRecipe = async (ingredients) => {
    const messages = [
        {role: "system", content: "You are a helpful assistant."},
        {role: "user", content: `Given the following ingredients: ${ingredients},
        please generate a recipe in JSON format with keys for 'name',
        'ingredients' as an array of ingredient names,
        'instructions' as an array of steps with 'step' (as an integer) and 'description'.`}
    ];

    const response = await openai.post('/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 400,
        n: 3,
    });

    // return response.data.choices.map(choice => JSON.parse(choice.message.content));
    return response.data.choices.map(choice => {
        try {
            return JSON.parse(choice.message.content);
        } catch (err) {
            console.error('Failed to parse JSON: ', choice.message.content);
            return null;
        }
    }).filter(recipe => recipe !== null);  // Filter out null results
};
