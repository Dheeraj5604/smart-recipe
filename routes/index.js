const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Import the Recipe model
const Recipe = require('../models/Recipe');

// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

// --- AWS REKOGNITION CONFIGURATION ---
// It will automatically use the credentials from your .env file
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Create a Rekognition client
const rekognition = new AWS.Rekognition();


// --- GOOGLE GEMINI AI CONFIGURATION ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// --- HELPER FUNCTION FOR AWS REKOGNITION ---
async function recognizeIngredients(imageBuffer) {
    const params = {
        Image: {
            Bytes: imageBuffer
        },
        MaxLabels: 20, // Max number of labels to return
        MinConfidence: 85 // Only return labels with confidence > 85%
    };

    try {
        // Call the Rekognition API
        const data = await rekognition.detectLabels(params).promise();
        
        // Extract the names of the detected labels
        const ingredients = data.Labels.map(label => label.Name.toLowerCase());

        return ingredients;
    } catch (err) {
        // This will log the detailed error to your server terminal
        console.error("AMAZON REKOGNITION ERROR:", err);
        // This will send a generic error back to the user's browser
        throw new Error("Failed to analyze image with Amazon Rekognition.");
    }
}


async function generateAiRecipe(ingredientsList) {
    if (!ingredientsList || ingredientsList.length === 0) return null;

    // This is the prompt we send to the AI. Asking for JSON makes it easy to parse.
    const prompt = `gi
        You are a creative chef. Based on the following ingredients, create a unique recipe.
        Ingredients: ${ingredientsList.join(', ')}.
        
        Please provide the response in a JSON object format with the following keys:
        - "title": A creative name for the recipe.
        - "description": A short, enticing description (20-30 words).
        - "servings": A number representing the serving size.
        - "difficulty": "Easy", "Medium", or "Hard".
        - "cookingTime": A number representing the total cooking time in minutes.
        - "ingredients": An array of objects, where each object has a "quantity" and "name" key (e.g., {"quantity": "1 cup", "name": "flour"}).
        - "instructions": An array of strings, where each string is a step in the recipe.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        // Clean the response to make sure it's valid JSON
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const aiRecipe = JSON.parse(text);
        
        // Add a flag to identify this as an AI recipe
        aiRecipe.isAiGenerated = true; 
        
        return aiRecipe;
    } catch (error) {
        console.error("GEMINI AI ERROR:", error);
        return null; // Return null if the AI fails
    }
}


// --- DEFINE ROUTES ---
router.get('/', (req, res) => {
    res.render('index');
});

router.post('/find-recipes', upload.single('image'), async (req, res) => {
    try {
        let ingredients = [];
        if (req.body.ingredients) {
            ingredients.push(...req.body.ingredients.split(',').map(item => item.trim().toLowerCase()).filter(Boolean));
        }
        if (req.file) {
            const imageIngredients = await recognizeIngredients(req.file.buffer);
            ingredients.push(...imageIngredients);
        }
        
        ingredients = [...new Set(ingredients)];
        if (ingredients.length === 0) {
            return res.render('results', { recipes: [], query: 'No ingredients provided.' });
        }

        const allRecipes = await Recipe.find({});
        const scoredRecipes = allRecipes.map(recipe => {
            const recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase());
            const matchCount = ingredients.reduce((count, userIng) => {
                return recipeIngredients.some(recIng => recIng.includes(userIng)) ? count + 1 : count;
            }, 0);
            const score = recipe.ingredients.length > 0 ? matchCount / recipe.ingredients.length : 0;
            return { ...recipe.toObject(), score, matchCount };
        }).filter(recipe => recipe.score > 0);

        const sortedRecipes = scoredRecipes.sort((a, b) => b.score - a.score);
        res.render('results', { recipes: sortedRecipes, query: ingredients.join(', ') });

    } catch (error) {
        console.error('Error finding recipes:', error);
        res.status(500).render('results', { recipes: [], error: 'An error occurred while generating recipes.' });
    }
});

router.post('/api/recognize-ingredient', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded.' });
    }
    try {
        const ingredients = await recognizeIngredients(req.file.buffer);
        res.json({ ingredients });
    } catch (error) {
        console.error('API Recognition Error:', error);
        res.status(500).json({ error: 'Failed to recognize ingredients.' });
    }
});

// --- EXPORT THE ROUTER ---
module.exports = router;