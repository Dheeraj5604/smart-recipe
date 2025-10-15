const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    cookingTime: { type: Number, required: true }, // in minutes
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    dietaryTags: [String], // e.g., ['vegetarian', 'gluten-free']
    servings: Number,
    ingredients: [{
        name: String,
        quantity: String,
    }],
    instructions: [String],
    nutritionalInfo: {
        calories: Number,
        protein: String,
        carbs: String,
        fat: String,
    },
    imageUrl: String,
});

module.exports = mongoose.model('Recipe', recipeSchema);