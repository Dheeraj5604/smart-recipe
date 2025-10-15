require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');

const recipes = [
    // -------------------------
    // BATCH 1: EUROPEAN & ITALIAN
    // -------------------------
    {
        title: "Classic Tomato Pasta",
        description: "A simple yet delicious pasta dish with a rich tomato sauce from Italy.",
        cookingTime: 25,
        difficulty: "Easy",
        dietaryTags: ["vegetarian", "vegan-adaptable", "italian"],
        servings: 4,
        ingredients: [{ name: "pasta", quantity: "400g" }, { name: "canned tomatoes", quantity: "1 can (400g)" }, { name: "onion", quantity: "1, chopped" }, { name: "garlic", quantity: "2 cloves, minced" }, { name: "olive oil", quantity: "2 tbsp" }, { name: "basil", quantity: "a few leaves" }],
        instructions: ["Cook pasta according to package directions.", "In a saucepan, heat olive oil over medium heat. Add onion and garlic and cook until softened.", "Add canned tomatoes, break them up with a spoon, and simmer for 15 minutes.", "Stir in fresh basil. Season with salt and pepper.", "Drain pasta and toss with the sauce."],
        nutritionalInfo: { calories: 450, protein: "15g", carbs: "80g", fat: "8g" },
        imageUrl: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg"
    },
    {
        title: "Mushroom Risotto",
        description: "A creamy and savory Italian rice dish made with Arborio rice and mushrooms.",
        cookingTime: 40,
        difficulty: "Medium",
        dietaryTags: ["italian", "vegetarian", "gluten-free"],
        servings: 4,
        ingredients: [{ name: "arborio rice", quantity: "1 1/2 cups" }, { name: "vegetable broth", quantity: "6 cups, warm" }, { name: "mushrooms", quantity: "250g, sliced" }, { name: "onion", quantity: "1, chopped" }, { name: "white wine", quantity: "1/2 cup" }, { name: "parmesan cheese", quantity: "1 cup, grated" }, { name: "butter", quantity: "3 tbsp" }],
        instructions: ["In a large saucepan, sauté mushrooms in butter until browned. Remove and set aside.", "In the same pan, sauté onion until soft. Add rice and toast for a minute.", "Pour in the white wine and cook until absorbed.", "Add the warm broth one ladle at a time, stirring continuously and waiting for it to be absorbed before adding more.", "When the rice is creamy and cooked, stir in the cooked mushrooms, Parmesan cheese, and remaining butter."],
        nutritionalInfo: { calories: 550, protein: "20g", carbs: "70g", fat: "20g" },
        imageUrl: "https://images.pexels.com/photos/6419732/pexels-photo-6419732.jpeg"
    },
    {
        title: "Classic Beef Lasagna",
        description: "Layers of pasta, rich beef ragu, creamy béchamel, and melted cheese.",
        cookingTime: 120,
        difficulty: "Medium",
        dietaryTags: ["italian"],
        servings: 8,
        ingredients: [{ name: "lasagna sheets", quantity: "12" }, { name: "ground beef", quantity: "500g" }, { name: "canned tomatoes", quantity: "1 can (800g)" }, { name: "onion", quantity: "1, chopped" }, { name: "butter", quantity: "1/2 cup" }, { name: "all-purpose flour", quantity: "1/2 cup" }, { name: "milk", quantity: "4 cups" }, { name: "mozzarella cheese", quantity: "2 cups, shredded" }, { name: "parmesan cheese", quantity: "1 cup, grated" }],
        instructions: ["Make the beef ragu by sautéing onion, browning the beef, adding tomatoes, and simmering for 1 hour.", "Make the béchamel sauce by melting butter, whisking in flour, and gradually adding milk until thick.", "Cook lasagna sheets.", "Layer the baking dish: ragu, pasta, béchamel, and cheese. Repeat.", "Bake at 180°C (350°F) for 30-40 minutes until golden and bubbly."],
        nutritionalInfo: { calories: 750, protein: "40g", carbs: "60g", fat: "40g" },
        imageUrl: "https://images.pexels.com/photos/5848545/pexels-photo-5848545.jpeg"
    },
    {
        title: "Simple Greek Salad",
        description: "A refreshing and healthy salad with classic Mediterranean flavors.",
        cookingTime: 15,
        difficulty: "Easy",
        dietaryTags: ["vegetarian", "gluten-free", "greek"],
        servings: 4,
        ingredients: [{ name: "cucumber", quantity: "1, chopped" }, { name: "tomatoes", quantity: "4, chopped" }, { name: "red onion", quantity: "1/2, thinly sliced" }, { name: "feta cheese", quantity: "1 cup, crumbled" }, { name: "kalamata olives", quantity: "1/2 cup" }, { name: "olive oil", quantity: "3 tbsp" }, { name: "lemon juice", quantity: "1 tbsp" }, { name: "dried oregano", quantity: "1 tsp" }],
        instructions: ["In a large bowl, combine the cucumber, tomatoes, and red onion.", "Gently stir in the feta cheese and olives.", "In a small bowl, whisk together the olive oil, lemon juice, and oregano.", "Pour the dressing over the salad and toss to combine.", "Serve immediately."],
        nutritionalInfo: { calories: 350, protein: "10g", carbs: "15g", fat: "28g" },
        imageUrl: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg"
    },
    {
        title: "Spanish Paella",
        description: "A famous Spanish rice dish cooked with saffron, seafood, and vegetables.",
        cookingTime: 50,
        difficulty: "Hard",
        dietaryTags: ["spanish", "european"],
        servings: 6,
        ingredients: [{ name: "paella rice (bomba)", quantity: "2 cups" }, { name: "chicken broth", quantity: "6 cups" }, { name: "shrimp", quantity: "250g" }, { name: "mussels", quantity: "500g" }, { name: "bell pepper", quantity: "1, chopped" }, { name: "canned tomatoes", quantity: "1 can (400g)" }, { name: "saffron threads", quantity: "a pinch" }],
        instructions: ["In a large paella pan, sauté bell pepper. Add tomatoes and cook down.", "Add rice and toast for a minute. Add chicken broth and saffron. Bring to a simmer.", "Do not stir the rice. Let it cook for 15-20 minutes.", "Arrange the shrimp and mussels on top of the rice and cook for another 5-10 minutes until seafood is cooked and rice has absorbed the liquid.", "Let it rest before serving."],
        nutritionalInfo: { calories: 600, protein: "35g", carbs: "80g", fat: "10g" },
        imageUrl: "https://images.pexels.com/photos/262967/pexels-photo-262967.jpeg"
    },
    {
        title: "French Onion Soup",
        description: "A classic French soup made with caramelized onions and beef stock, topped with melted cheese.",
        cookingTime: 70,
        difficulty: "Medium",
        dietaryTags: ["french", "european"],
        servings: 4,
        ingredients: [{ name: "onions", quantity: "4 large, thinly sliced" }, { name: "butter", quantity: "1/4 cup" }, { name: "beef broth", quantity: "6 cups" }, { name: "dry white wine", quantity: "1 cup" }, { name: "baguette", quantity: "4 slices" }, { name: "gruyère cheese", quantity: "1 cup, shredded" }],
        instructions: ["In a large pot, melt butter and cook onions on low heat for 30-40 minutes until deeply caramelized.", "Deglaze the pot with white wine. Add beef broth and simmer for 20 minutes.", "Ladle soup into oven-safe bowls. Top each with a slice of baguette and a generous amount of Gruyère cheese.", "Broil for 2-3 minutes until the cheese is melted and bubbly."],
        nutritionalInfo: { calories: 450, protein: "20g", carbs: "30g", fat: "25g" },
        imageUrl: "https://images.pexels.com/photos/13590514/pexels-photo-13590514.jpeg"
    },
    // -------------------
    // BATCH 2: ASIAN
    // -------------------
    {
        title: "Spicy Chicken Stir-Fry",
        description: "A quick and flavorful stir-fry that's perfect for a weeknight dinner.",
        cookingTime: 20,
        difficulty: "Easy",
        dietaryTags: ["asian"],
        servings: 2,
        ingredients: [{ name: "chicken breast", quantity: "2, sliced" }, { name: "broccoli", quantity: "1 head, cut into florets" }, { name: "bell pepper", quantity: "1, sliced" }, { name: "soy sauce", quantity: "3 tbsp" }, { name: "ginger", quantity: "1 tsp, grated" }, { name: "rice", quantity: "1 cup, for serving" }],
        instructions: ["In a wok or large skillet, heat oil over high heat. Add chicken and cook until browned.", "Add broccoli and bell pepper, and stir-fry for 3-5 minutes until tender-crisp.", "In a small bowl, whisk together soy sauce and ginger.", "Pour sauce over the stir-fry and cook for 1 minute until heated through.", "Serve immediately over steamed rice."],
        nutritionalInfo: { calories: 550, protein: "40g", carbs: "50g", fat: "15g" },
        imageUrl: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg"
    },
    {
        title: "Chicken Tikka Masala",
        description: "A creamy and aromatic Indian curry with grilled chicken pieces.",
        cookingTime: 40,
        difficulty: "Medium",
        servings: 4,
        dietaryTags: ["indian"],
        ingredients: [{ name: "chicken breast", quantity: "500g, cubed" }, { name: "plain yogurt", quantity: "1 cup" }, { name: "lemon juice", quantity: "2 tbsp" }, { name: "garam masala", quantity: "2 tsp" }, { name: "turmeric", quantity: "1 tsp" }, { name: "canned crushed tomatoes", quantity: "1 can (400g)" }, { name: "heavy cream", quantity: "1 cup" }, { name: "onion", quantity: "1, chopped" }],
        instructions: ["In a bowl, marinate chicken with yogurt, lemon juice, garam masala, and turmeric for at least 1 hour.", "Grill or pan-fry the chicken until cooked through. Set aside.", "In a large pan, sauté onion until golden. Add crushed tomatoes and cook for 10 minutes.", "Stir in the heavy cream and simmer for 5 minutes.", "Add the cooked chicken to the sauce and heat through. Serve with rice or naan."],
        nutritionalInfo: { calories: 600, protein: "45g", carbs: "20g", fat: "40g" },
        imageUrl: "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg"
    },
    {
        title: "Japanese Ramen",
        description: "A comforting Japanese noodle soup with a rich, savory broth.",
        cookingTime: 120,
        difficulty: "Hard",
        dietaryTags: ["japanese", "asian"],
        servings: 2,
        ingredients: [{ name: "ramen noodles", quantity: "2 servings" }, { name: "pork belly", quantity: "200g" }, { name: "chicken broth", quantity: "4 cups" }, { name: "soy sauce", quantity: "3 tbsp" }, { name: "mirin", quantity: "2 tbsp" }, { name: "soft-boiled eggs", quantity: "2" }, { name: "green onions", quantity: "for garnish" }],
        instructions: ["Braise pork belly in soy sauce and mirin for 1.5 hours.", "Combine chicken broth, more soy sauce, and mirin to create the soup base. Heat gently.", "Cook ramen noodles according to package instructions.", "Assemble bowls with noodles, broth, sliced pork belly, a soft-boiled egg, and green onions."],
        nutritionalInfo: { calories: 800, protein: "40g", carbs: "90g", fat: "35g" },
        imageUrl: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg"
    },
    {
        title: "Thai Green Curry",
        description: "A fragrant and spicy Thai curry made with coconut milk and green curry paste.",
        cookingTime: 30,
        difficulty: "Medium",
        dietaryTags: ["thai", "asian", "gluten-free"],
        servings: 4,
        ingredients: [{ name: "chicken breast", quantity: "400g, cubed" }, { name: "coconut milk", quantity: "1 can (400ml)" }, { name: "green curry paste", quantity: "2 tbsp" }, { name: "bamboo shoots", quantity: "1/2 cup" }, { name: "fish sauce", quantity: "1 tbsp" }, { name: "sugar", quantity: "1 tsp" }, { name: "thai basil", quantity: "a handful" }],
        instructions: ["In a wok, sauté the green curry paste in a little coconut milk until fragrant.", "Add the chicken and cook until no longer pink.", "Pour in the rest of the coconut milk and bring to a simmer.", "Add bamboo shoots, fish sauce, and sugar. Simmer for 10 minutes.", "Stir in Thai basil leaves before serving with rice."],
        nutritionalInfo: { calories: 500, protein: "35g", carbs: "15g", fat: "35g" },
        imageUrl: "https://images.pexels.com/photos/4773769/pexels-photo-4773769.jpeg"
    },
    {
        title: "Korean Bibimbap",
        description: "A vibrant Korean rice bowl with assorted seasoned vegetables, meat, and a fried egg.",
        cookingTime: 40,
        difficulty: "Medium",
        dietaryTags: ["korean", "asian"],
        servings: 2,
        ingredients: [{ name: "cooked rice", quantity: "2 cups" }, { name: "beef sirloin", quantity: "150g, thinly sliced" }, { name: "spinach", quantity: "1 cup" }, { name: "carrots", quantity: "1, julienned" }, { name: "shiitake mushrooms", quantity: "1/2 cup, sliced" }, { name: "gochujang", quantity: "2 tbsp" }, { name: "eggs", quantity: "2" }],
        instructions: ["Marinate beef in soy sauce and garlic. Sauté until cooked.", "Blanch spinach and sauté carrots and mushrooms separately.", "Place warm rice in bowls. Arrange the cooked vegetables and beef on top.", "Fry two eggs sunny-side up and place one on top of each bowl.", "Serve with a dollop of gochujang."],
        nutritionalInfo: { calories: 650, protein: "30g", carbs: "80g", fat: "20g" },
        imageUrl: "https://images.pexels.com/photos/8810237/pexels-photo-8810237.jpeg"
    },
    {
        title: "Vietnamese Pho",
        description: "A classic Vietnamese noodle soup with a fragrant, spiced beef broth.",
        cookingTime: 180,
        difficulty: "Hard",
        dietaryTags: ["vietnamese", "asian"],
        servings: 4,
        ingredients: [{ name: "beef bones", quantity: "1kg" }, { name: "beef brisket", quantity: "500g" }, { name: "rice noodles", quantity: "4 servings" }, { name: "onion", quantity: "1" }, { name: "ginger", quantity: "1 piece" }, { name: "star anise", quantity: "2" }, { name: "cinnamon stick", quantity: "1" }, { name: "bean sprouts", quantity: "for serving" }, { name: "fresh herbs (cilantro, mint, basil)", quantity: "for serving" }],
        instructions: ["Char onion and ginger. Add to a large pot with beef bones, brisket, and spices. Cover with water and simmer for at least 3 hours.", "Remove brisket, let cool, and slice thinly.", "Cook rice noodles according to package directions.", "Strain the broth.", "Assemble bowls with noodles, sliced brisket, and top with hot broth. Serve with fresh bean sprouts and herbs."],
        nutritionalInfo: { calories: 550, protein: "40g", carbs: "60g", fat: "15g" },
        imageUrl: "https://images.pexels.com/photos/2445398/pexels-photo-2445398.jpeg"
    },
    {
        title: "Palak Paneer",
        description: "A popular Indian vegetarian dish consisting of paneer in a thick paste made from puréed spinach.",
        cookingTime: 35,
        difficulty: "Medium",
        dietaryTags: ["indian", "vegetarian", "gluten-free"],
        servings: 4,
        ingredients: [{ name: "paneer", quantity: "250g, cubed" }, { name: "spinach", quantity: "500g" }, { name: "onion", quantity: "1, finely chopped" }, { name: "tomatoes", quantity: "2, pureed" }, { name: "ginger-garlic paste", quantity: "1 tbsp" }, { name: "heavy cream", quantity: "1/4 cup" }, { name: "garam masala", quantity: "1 tsp" }],
        instructions: ["Blanch spinach, then blend to a smooth paste.", "Lightly fry paneer cubes until golden brown and set aside.", "Sauté onions until golden, add ginger-garlic paste and tomato puree. Cook until oil separates.", "Add the spinach paste and cook for 5 minutes. Stir in cream and garam masala.", "Add the fried paneer cubes and simmer for another 2 minutes. Serve hot with naan or rice."],
        nutritionalInfo: { calories: 400, protein: "20g", carbs: "15g", fat: "30g" },
        imageUrl: "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg"
    },
    {
        title: "Sushi Rolls (Maki)",
        description: "Classic Japanese dish of vinegared rice and various ingredients rolled in seaweed.",
        cookingTime: 45,
        difficulty: "Hard",
        dietaryTags: ["japanese", "asian"],
        servings: 4,
        ingredients: [{ name: "sushi rice", quantity: "2 cups" }, { name: "nori (seaweed sheets)", quantity: "4" }, { name: "sushi-grade tuna", quantity: "150g, sliced" }, { name: "cucumber", quantity: "1/2, julienned" }, { name: "avocado", quantity: "1, sliced" }, { name: "rice vinegar", quantity: "1/4 cup" }, { name: "sugar", quantity: "2 tbsp" }, { name: "soy sauce", quantity: "for dipping" }],
        instructions: ["Cook sushi rice. Once cooked, season with a mixture of rice vinegar and sugar.", "Lay a sheet of nori on a bamboo rolling mat. Spread a thin layer of rice over the nori.", "Arrange your fillings (tuna, cucumber, avocado) in a line across the rice.", "Tightly roll the nori using the bamboo mat.", "Slice the roll into 6-8 pieces with a sharp, wet knife. Serve with soy sauce."],
        nutritionalInfo: { calories: 450, protein: "20g", carbs: "70g", fat: "10g" },
        imageUrl: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg"
    },
    // -------------------
    // BATCH 3: AMERICAS
    // -------------------
    {
        title: "Classic Guacamole",
        description: "A creamy and zesty avocado dip from Mexico, perfect with tortilla chips.",
        cookingTime: 10,
        difficulty: "Easy",
        dietaryTags: ["vegetarian", "vegan", "gluten-free", "mexican"],
        servings: 4,
        ingredients: [{ name: "avocado", quantity: "3 ripe" }, { name: "lime", quantity: "1, juiced" }, { name: "red onion", quantity: "1/4 cup, finely chopped" }, { name: "cilantro", quantity: "2 tbsp, chopped" }, { name: "jalapeño", quantity: "1, minced (optional)" }, { name: "salt", quantity: "1/2 tsp" }],
        instructions: ["Mash the avocados in a medium bowl.", "Stir in the lime juice, red onion, cilantro, and jalapeño.", "Season with salt to taste.", "Serve immediately."],
        nutritionalInfo: { calories: 150, protein: "2g", carbs: "9g", fat: "15g" },
        imageUrl: "https://images.pexels.com/photos/6604471/pexels-photo-6604471.jpeg"
    },
    {
        title: "Beef Tacos",
        description: "Classic ground beef tacos for a fun and easy dinner.",
        cookingTime: 20,
        difficulty: "Easy",
        servings: 4,
        dietaryTags: ["mexican"],
        ingredients: [{ name: "ground beef", quantity: "500g" }, { name: "taco seasoning", quantity: "1 packet" }, { name: "taco shells", quantity: "8" }, { name: "lettuce", quantity: "1 cup, shredded" }, { name: "cheddar cheese", quantity: "1 cup, shredded" }, { name: "salsa", quantity: "1/2 cup" }],
        instructions: ["In a skillet, cook ground beef over medium-high heat until no longer pink. Drain fat.", "Stir in taco seasoning and 1/2 cup of water. Simmer for 5 minutes.", "Warm taco shells according to package directions.", "Assemble tacos with beef, lettuce, cheese, and salsa."],
        nutritionalInfo: { calories: 400, protein: "25g", carbs: "20g", fat: "25g" },
        imageUrl: "https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg"
    },
    {
        title: "American BBQ Ribs",
        description: "Slow-cooked, fall-off-the-bone pork ribs slathered in tangy BBQ sauce.",
        cookingTime: 180,
        difficulty: "Medium",
        dietaryTags: ["american"],
        servings: 4,
        ingredients: [{ name: "pork ribs", quantity: "1 rack" }, { name: "bbq sauce", quantity: "2 cups" }, { name: "brown sugar", quantity: "1/4 cup" }, { name: "paprika", quantity: "1 tbsp" }, { name: "garlic powder", quantity: "1 tsp" }, { name: "black pepper", quantity: "1 tsp" }],
        instructions: ["Create a dry rub with brown sugar, paprika, garlic powder, and pepper. Rub all over the ribs.", "Wrap the ribs tightly in foil and bake at 150°C (300°F) for 2.5-3 hours until tender.", "Unwrap the ribs, brush generously with BBQ sauce.", "Grill or broil for a few minutes on each side until the sauce is caramelized and bubbly."],
        nutritionalInfo: { calories: 800, protein: "50g", carbs: "40g", fat: "50g" },
        imageUrl: "https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg"
    },
    {
        title: "Peruvian Lomo Saltado",
        description: "A popular Peruvian stir-fry combining marinated sirloin strips with onions, tomatoes, and french fries.",
        cookingTime: 25,
        difficulty: "Medium",
        dietaryTags: ["peruvian", "south american"],
        servings: 4,
        ingredients: [{ name: "beef sirloin", quantity: "500g, cut into strips" }, { name: "soy sauce", quantity: "1/4 cup" }, { name: "vinegar", quantity: "2 tbsp" }, { name: "red onion", quantity: "1, cut into wedges" }, { name: "tomatoes", quantity: "2, cut into wedges" }, { name: "french fries", quantity: "2 cups, cooked" }, { name: "rice", quantity: "for serving" }],
        instructions: ["Marinate beef in soy sauce and vinegar.", "In a very hot wok or skillet, stir-fry the beef until browned. Remove from wok.", "Add the onion and tomato wedges to the wok and stir-fry for 1-2 minutes.", "Return the beef to the wok, add the french fries, and toss everything together.", "Serve immediately with rice."],
        nutritionalInfo: { calories: 700, protein: "40g", carbs: "70g", fat: "30g" },
        imageUrl: "https://images.pexels.com/photos/10323331/pexels-photo-10323331.jpeg"
    },
    {
        title: "Chicken Fajitas",
        description: "Sizzling strips of marinated chicken with bell peppers and onions, served in warm tortillas.",
        cookingTime: 30,
        difficulty: "Easy",
        dietaryTags: ["mexican"],
        servings: 4,
        ingredients: [{ name: "chicken breast", quantity: "500g, sliced" }, { name: "bell peppers", quantity: "2, sliced" }, { name: "onion", quantity: "1, sliced" }, { name: "lime juice", quantity: "1/4 cup" }, { name: "chili powder", quantity: "1 tbsp" }, { name: "cumin", quantity: "1 tsp" }, { name: "flour tortillas", quantity: "8" }],
        instructions: ["In a bowl, toss chicken with lime juice, chili powder, and cumin.", "Heat oil in a large skillet over high heat. Add the chicken and cook until browned.", "Add the bell peppers and onion to the skillet and cook until tender-crisp.", "Serve sizzling hot with warm tortillas and your favorite toppings like salsa, guacamole, and sour cream."],
        nutritionalInfo: { calories: 500, protein: "40g", carbs: "40g", fat: "20g" },
        imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"
    },
    {
        title: "Macaroni and Cheese",
        description: "Creamy, cheesy, and comforting homemade macaroni and cheese.",
        cookingTime: 30,
        difficulty: "Easy",
        dietaryTags: ["american", "vegetarian"],
        servings: 6,
        ingredients: [{ name: "macaroni", quantity: "250g" }, { name: "butter", quantity: "1/4 cup" }, { name: "all-purpose flour", quantity: "1/4 cup" }, { name: "milk", quantity: "3 cups" }, { name: "cheddar cheese", quantity: "2 cups, shredded" }, { name: "salt", quantity: "1/2 tsp" }],
        instructions: ["Cook macaroni according to package directions.", "In a saucepan, melt butter. Whisk in flour and cook for 1 minute.", "Gradually whisk in milk until smooth. Bring to a simmer and cook until thickened.", "Remove from heat and stir in the shredded cheddar cheese until melted. Season with salt.", "Combine the cheese sauce with the cooked macaroni. Serve immediately."],
        nutritionalInfo: { calories: 550, protein: "25g", carbs: "50g", fat: "30g" },
        imageUrl: "https://images.pexels.com/photos/1410236/pexels-photo-1410236.jpeg"
    },
    // ------------------------------------
    // BATCH 4: MIDDLE EAST & AFRICA
    // ------------------------------------
    {
        title: "Moroccan Chicken Tagine",
        description: "A fragrant and savory Moroccan stew slow-cooked with chicken, spices, olives, and preserved lemons.",
        cookingTime: 75,
        difficulty: "Medium",
        dietaryTags: ["moroccan", "african"],
        servings: 4,
        ingredients: [{ name: "chicken thighs", quantity: "8" }, { name: "onion", quantity: "1, sliced" }, { name: "ginger", quantity: "1 tbsp, grated" }, { name: "turmeric", quantity: "1 tsp" }, { name: "cumin", quantity: "1 tsp" }, { name: "green olives", quantity: "1 cup" }, { name: "preserved lemons", quantity: "1, quartered" }, { name: "chicken broth", quantity: "1 cup" }],
        instructions: ["In a tagine or Dutch oven, brown the chicken pieces.", "Add the onion, ginger, and spices, and cook until the onion is soft.", "Add the chicken broth, olives, and preserved lemons. Bring to a simmer.", "Cover and cook on low heat for about 1 hour, or until the chicken is tender.", "Serve with couscous or crusty bread."],
        nutritionalInfo: { calories: 550, protein: "45g", carbs: "15g", fat: "35g" },
        imageUrl: "https://images.pexels.com/photos/5953569/pexels-photo-5953569.jpeg"
    },
    {
        title: "Classic Hummus",
        description: "A smooth and creamy Middle Eastern dip made from chickpeas, tahini, lemon, and garlic.",
        cookingTime: 10,
        difficulty: "Easy",
        dietaryTags: ["vegan", "vegetarian", "gluten-free", "middle eastern"],
        servings: 6,
        ingredients: [{ name: "canned chickpeas", quantity: "1 can, drained and rinsed" }, { name: "tahini", quantity: "1/4 cup" }, { name: "lemon juice", quantity: "1/4 cup" }, { name: "garlic", quantity: "1 clove" }, { name: "olive oil", quantity: "2 tbsp" }, { name: "water", quantity: "2-4 tbsp" }],
        instructions: ["In a food processor, combine tahini and lemon juice. Process for 1 minute.", "Add the chickpeas, garlic, and olive oil. Process until smooth.", "With the processor running, slowly add 2-4 tablespoons of water until you reach the desired creamy consistency.", "Season with salt. Serve drizzled with more olive oil."],
        nutritionalInfo: { calories: 150, protein: "5g", carbs: "12g", fat: "9g" },
        imageUrl: "https://images.pexels.com/photos/5639691/pexels-photo-5639691.jpeg"
    },
    {
        title: "Falafel",
        description: "Crispy fried balls or patties made from ground chickpeas, a Middle Eastern staple.",
        cookingTime: 25,
        difficulty: "Medium",
        dietaryTags: ["vegan", "vegetarian"],
        servings: 4,
        ingredients: [{ name: "dried chickpeas", quantity: "1 cup, soaked overnight" }, { name: "onion", quantity: "1/2, chopped" }, { name: "parsley", quantity: "1/2 cup" }, { name: "cilantro", quantity: "1/2 cup" }, { name: "garlic", quantity: "3 cloves" }, { name: "cumin", quantity: "1 tsp" }, { name: "baking powder", quantity: "1 tsp" }],
        instructions: ["Drain the soaked chickpeas well.", "In a food processor, combine chickpeas, onion, parsley, cilantro, garlic, and spices. Pulse until the mixture is finely chopped but not a paste.", "Stir in baking powder. Refrigerate mixture for 30 minutes.", "Form small balls or patties. Deep-fry at 180°C (350°F) for 3-5 minutes until golden brown and crispy.", "Serve in pita bread with tahini sauce."],
        nutritionalInfo: { calories: 350, protein: "15g", carbs: "40g", fat: "15g" },
        imageUrl: "https://images.pexels.com/photos/4217730/pexels-photo-4217730.jpeg"
    },
    {
        title: "Shakshuka",
        description: "A popular dish of eggs poached in a flavorful sauce of tomatoes, chili peppers, and onions.",
        cookingTime: 30,
        difficulty: "Easy",
        dietaryTags: ["vegetarian", "gluten-free"],
        servings: 2,
        ingredients: [{ name: "olive oil", quantity: "2 tbsp" }, { name: "onion", quantity: "1, chopped" }, { name: "bell pepper", quantity: "1, chopped" }, { name: "garlic", quantity: "2 cloves, minced" }, { name: "canned crushed tomatoes", quantity: "1 can (400g)" }, { name: "paprika", quantity: "1 tsp" }, { name: "cumin", quantity: "1 tsp" }, { name: "eggs", quantity: "4" }],
        instructions: ["Heat olive oil in a skillet. Sauté onion and bell pepper until soft.", "Add garlic and spices, and cook for another minute.", "Pour in the crushed tomatoes and simmer for 10 minutes until the sauce thickens.", "Make four wells in the sauce and crack an egg into each one.", "Cover the skillet and cook for 5-8 minutes, until the egg whites are set but the yolks are still runny.", "Garnish with fresh cilantro or parsley."],
        nutritionalInfo: { calories: 400, protein: "20g", carbs: "25g", fat: "25g" },
        imageUrl: "https://images.pexels.com/photos/5887739/pexels-photo-5887739.jpeg"
    },
    // ------------------------------------
    // BATCH 5: BREAKFAST & DESSERTS
    // ------------------------------------
    {
        title: "Fluffy Scrambled Eggs",
        description: "A quick and classic breakfast staple, made perfectly fluffy.",
        cookingTime: 5,
        difficulty: "Easy",
        dietaryTags: ["vegetarian", "gluten-free", "breakfast"],
        servings: 2,
        ingredients: [{ name: "eggs", quantity: "4" }, { name: "milk", quantity: "1/4 cup" }, { name: "butter", quantity: "1 tbsp" }, { name: "salt and pepper", quantity: "to taste" }],
        instructions: ["In a bowl, whisk together the eggs, milk, salt, and pepper until light and frothy.", "Melt butter in a non-stick skillet over medium-low heat.", "Pour in the egg mixture. Let it sit for about 20 seconds until the edges start to set.", "Gently push the eggs from the edges toward the center, creating soft curds.", "Continue cooking and pushing the eggs until they are cooked to your liking.", "Serve immediately."],
        nutritionalInfo: { calories: 280, protein: "25g", carbs: "3g", fat: "18g" },
        imageUrl: "https://images.pexels.com/photos/3738753/pexels-photo-3738753.jpeg"
    },
    {
        title: "Classic American Pancakes",
        description: "Fluffy, buttermilk pancakes for a perfect weekend breakfast.",
        cookingTime: 20,
        difficulty: "Easy",
        dietaryTags: ["vegetarian", "breakfast", "american"],
        servings: 4,
        ingredients: [{ name: "all-purpose flour", quantity: "1 1/2 cups" }, { name: "baking powder", quantity: "2 tsp" }, { name: "sugar", quantity: "2 tbsp" }, { name: "salt", quantity: "1/2 tsp" }, { name: "buttermilk", quantity: "1 1/4 cups" }, { name: "egg", quantity: "1" }, { name: "butter", quantity: "3 tbsp, melted" }],
        instructions: ["In a large bowl, whisk together flour, baking powder, sugar, and salt.", "In a separate bowl, whisk together buttermilk, egg, and melted butter.", "Pour the wet ingredients into the dry ingredients and stir until just combined. Do not overmix.", "Heat a lightly oiled griddle or frying pan over medium-high heat.", "Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake.", "Cook until bubbles appear on the surface, then flip and cook until browned on the other side."],
        nutritionalInfo: { calories: 350, protein: "10g", carbs: "50g", fat: "12g" },
        imageUrl: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg"
    },
    {
        title: "Classic French Toast",
        description: "Thick slices of bread soaked in a sweet egg custard and fried to golden perfection.",
        cookingTime: 15,
        difficulty: "Easy",
        dietaryTags: ["vegetarian", "breakfast"],
        servings: 4,
        ingredients: [{ name: "thick-sliced bread", quantity: "8 slices" }, { name: "eggs", quantity: "2" }, { name: "milk", quantity: "1/2 cup" }, { name: "cinnamon", quantity: "1 tsp" }, { name: "vanilla extract", quantity: "1/2 tsp" }, { name: "butter", quantity: "for frying" }],
        instructions: ["In a shallow dish, whisk together eggs, milk, cinnamon, and vanilla.", "Heat butter in a large skillet over medium heat.", "Dip each slice of bread into the egg mixture, soaking both sides.", "Place bread in the hot skillet and cook for 2-3 minutes per side, until golden brown.", "Serve immediately with maple syrup and fresh fruit."],
        nutritionalInfo: { calories: 250, protein: "10g", carbs: "30g", fat: "10g" },
        imageUrl: "https://images.pexels.com/photos/179836/pexels-photo-179836.jpeg"
    },
    {
        title: "Fudgy Chocolate Brownies",
        description: "Decadently rich and fudgy brownies for the ultimate chocolate lover.",
        cookingTime: 35,
        difficulty: "Easy",
        dietaryTags: ["vegetarian", "dessert"],
        servings: 16,
        ingredients: [{ name: "butter", quantity: "1 cup, melted" }, { name: "white sugar", quantity: "2 cups" }, { name: "eggs", quantity: "4" }, { name: "cocoa powder", quantity: "3/4 cup" }, { name: "all-purpose flour", quantity: "1 cup" }, { name: "vanilla extract", quantity: "1 tsp" }, { name: "chocolate chips", quantity: "1 cup" }],
        instructions: ["Preheat oven to 175°C (350°F). Grease a 9x13 inch pan.", "In a large bowl, mix melted butter and sugar. Beat in eggs and vanilla.", "Stir in cocoa powder and flour until just combined. Fold in chocolate chips.", "Spread batter evenly into the prepared pan.", "Bake for 25 to 30 minutes. Let cool completely before cutting."],
        nutritionalInfo: { calories: 300, protein: "4g", carbs: "40g", fat: "15g" },
        imageUrl: "https://images.pexels.com/photos/2067425/pexels-photo-2067425.jpeg"
    },
    {
        title: "New York Cheesecake",
        description: "A rich, dense, and creamy cheesecake with a graham cracker crust.",
        cookingTime: 90,
        difficulty: "Hard",
        dietaryTags: ["vegetarian", "dessert"],
        servings: 12,
        ingredients: [{ name: "graham cracker crumbs", quantity: "1 1/2 cups" }, { name: "butter", quantity: "6 tbsp, melted" }, { name: "cream cheese", quantity: "4 packages (8 oz each), softened" }, { name: "sugar", quantity: "1 1/2 cups" }, { name: "sour cream", quantity: "1 cup" }, { name: "vanilla extract", quantity: "2 tsp" }, { name: "eggs", quantity: "4" }],
        instructions: ["Preheat oven to 160°C (325°F). Mix graham cracker crumbs and melted butter; press into the bottom of a springform pan.", "In a large bowl, beat cream cheese and sugar until smooth. Blend in sour cream and vanilla.", "Add eggs one at a time, mixing on low speed until just blended.", "Pour filling over crust. Bake for 60-70 minutes.", "Let cool, then refrigerate for at least 4 hours before serving."],
        nutritionalInfo: { calories: 500, protein: "10g", carbs: "45g", fat: "35g" },
        imageUrl: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg"
    },
    {
        title: "Classic Tiramisu",
        description: "An elegant Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
        cookingTime: 30,
        difficulty: "Medium",
        dietaryTags: ["vegetarian", "dessert", "italian"],
        servings: 8,
        ingredients: [{ name: "egg yolks", quantity: "6" }, { name: "sugar", quantity: "1 cup" }, { name: "mascarpone cheese", quantity: "1 1/4 cups" }, { name: "heavy cream", quantity: "1 3/4 cups" }, { name: "strong brewed coffee", quantity: "2 cups, cooled" }, { name: "ladyfingers", quantity: "24" }, { name: "cocoa powder", quantity: "for dusting" }],
        instructions: ["Whisk egg yolks and sugar until pale and fluffy. Whisk in mascarpone cheese.", "In a separate bowl, whip heavy cream to stiff peaks. Gently fold into the mascarpone mixture.", "Quickly dip each ladyfinger in the cool coffee and arrange a single layer in a serving dish.", "Spread half of the mascarpone cream over the ladyfingers.", "Repeat with another layer of dipped ladyfingers and the remaining cream.", "Refrigerate for at least 4 hours. Dust with cocoa powder before serving."],
        nutritionalInfo: { calories: 600, protein: "10g", carbs: "50g", fat: "40g" },
        imageUrl: "https://images.pexels.com/photos/574111/pexels-photo-574111.jpeg"
    },
    // ------------------------------------
    // BATCH 6: SOUPS, SIDES & MORE
    // ------------------------------------
    {
        title: "Butternut Squash Soup",
        description: "A creamy, velvety soup that's perfect for autumn.",
        cookingTime: 50,
        difficulty: "Medium",
        dietaryTags: ["vegan", "gluten-free", "soup"],
        servings: 6,
        ingredients: [{ name: "butternut squash", quantity: "1 medium, peeled and cubed" }, { name: "vegetable broth", quantity: "4 cups" }, { name: "onion", quantity: "1, chopped" }, { name: "coconut milk", quantity: "1 cup" }, { name: "nutmeg", quantity: "1/4 tsp" }],
        instructions: ["In a large pot, sauté onion until soft.", "Add butternut squash and vegetable broth. Bring to a boil, then simmer for 20-25 minutes until squash is tender.", "Carefully transfer soup to a blender and blend until smooth. Or use an immersion blender.", "Return to pot, stir in coconut milk and nutmeg. Heat through.", "Season with salt and pepper."],
        nutritionalInfo: { calories: 180, protein: "4g", carbs: "25g", fat: "8g" },
        imageUrl: "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg"
    },
    {
        title: "Creamy Tomato Soup",
        description: "Classic comfort food, a rich and creamy soup made from ripe tomatoes.",
        cookingTime: 30,
        difficulty: "Easy",
        dietaryTags: ["vegetarian", "soup"],
        servings: 4,
        ingredients: [{ name: "canned whole tomatoes", quantity: "1 can (800g)" }, { name: "vegetable broth", quantity: "2 cups" }, { name: "onion", quantity: "1, chopped" }, { name: "garlic", quantity: "2 cloves, minced" }, { name: "heavy cream", quantity: "1/2 cup" }, { name: "butter", quantity: "2 tbsp" }],
        instructions: ["In a large pot, melt butter. Sauté onion and garlic until soft.", "Add the whole tomatoes (with their juice) and vegetable broth. Bring to a simmer.", "Cook for 15 minutes, crushing the tomatoes with a spoon.", "Use an immersion blender to blend the soup until smooth.", "Stir in the heavy cream and heat gently. Do not boil. Season with salt and pepper.", "Serve hot, perhaps with a grilled cheese sandwich."],
        nutritionalInfo: { calories: 250, protein: "5g", carbs: "20g", fat: "18g" },
        imageUrl: "https://images.pexels.com/photos/2664441/pexels-photo-2664441.jpeg"
    },
    {
        title: "Creamy Mashed Potatoes",
        description: "The ultimate comfort food side dish, smooth and buttery.",
        cookingTime: 30,
        difficulty: "Easy",
        dietaryTags: ["vegetarian", "gluten-free"],
        servings: 6,
        ingredients: [{ name: "potatoes", quantity: "1kg, peeled and quartered" }, { name: "butter", quantity: "1/2 cup" }, { name: "heavy cream", quantity: "1/2 cup, warm" }, { name: "salt", quantity: "1 tsp" }, { name: "black pepper", quantity: "1/2 tsp" }],
        instructions: ["Place potatoes in a large pot and cover with cold, salted water.", "Bring to a boil and cook for 15-20 minutes, or until very tender.", "Drain the potatoes well and return them to the pot.", "Mash the potatoes until smooth.", "Add the butter, warm cream, salt, and pepper. Stir until well combined and creamy.", "Serve hot."],
        nutritionalInfo: { calories: 300, protein: "4g", carbs: "35g", fat: "18g" },
        imageUrl: "https://images.pexels.com/photos/1775059/pexels-photo-1775059.jpeg"
    },
    {
        title: "Simple Bruschetta",
        description: "A classic Italian appetizer of grilled bread topped with fresh tomatoes and basil.",
        cookingTime: 15,
        difficulty: "Easy",
        dietaryTags: ["vegetarian", "appetizer"],
        servings: 6,
        ingredients: [{ name: "baguette", quantity: "1, sliced" }, { name: "tomatoes", quantity: "4, diced" }, { name: "garlic", quantity: "2 cloves" }, { name: "fresh basil", quantity: "1/4 cup, chopped" }, { name: "olive oil", quantity: "3 tbsp" }, { name: "balsamic glaze", quantity: "for drizzling" }],
        instructions: ["Toast the baguette slices until golden brown.", "Rub one side of each toast slice with a halved garlic clove.", "In a bowl, combine the diced tomatoes, chopped basil, and olive oil. Season with salt and pepper.", "Spoon the tomato mixture onto the toasted bread.", "Drizzle with balsamic glaze just before serving."],
        nutritionalInfo: { calories: 150, protein: "4g", carbs: "20g", fat: "6g" },
        imageUrl: "https://images.pexels.com/photos/5639430/pexels-photo-5639430.jpeg"
    },
    {
        title: "Garlic Bread",
        description: "Warm, buttery bread with a crisp crust and soft interior, loaded with garlic.",
        cookingTime: 15,
        difficulty: "Easy",
        dietaryTags: ["vegetarian", "side dish"],
        servings: 8,
        ingredients: [{ name: "french baguette", quantity: "1" }, { name: "butter", quantity: "1/2 cup, softened" }, { name: "garlic", quantity: "3 cloves, minced" }, { name: "parsley", quantity: "2 tbsp, chopped" }, { name: "salt", quantity: "1/4 tsp" }],
        instructions: ["Preheat oven to 180°C (350°F).", "Slice the baguette in half lengthwise.", "In a small bowl, mix the softened butter, minced garlic, parsley, and salt.", "Spread the garlic butter mixture evenly over both halves of the bread.", "Place on a baking sheet and bake for 10-12 minutes, or until golden brown and fragrant."],
        nutritionalInfo: { calories: 200, protein: "5g", carbs: "25g", fat: "10g" },
        imageUrl: "https://images.pexels.com/photos/3992147/pexels-photo-3992147.jpeg"
    },
    {
        title: "Shepherd's Pie",
        description: "A hearty British comfort food with a savory minced lamb filling topped with mashed potatoes.",
        cookingTime: 70,
        difficulty: "Medium",
        dietaryTags: ["british", "european"],
        servings: 6,
        ingredients: [{ name: "ground lamb", quantity: "500g" }, { name: "onion", quantity: "1, chopped" }, { name: "carrots", quantity: "2, diced" }, { name: "beef broth", quantity: "1 cup" }, { name: "worcestershire sauce", quantity: "1 tbsp" }, { name: "frozen peas", quantity: "1 cup" }, { name: "potatoes", quantity: "1kg, for mashing" }],
        instructions: ["Boil and mash the potatoes with butter and milk. Set aside.", "In a large skillet, brown the lamb. Add onion and carrots and cook until soft.", "Stir in beef broth and Worcestershire sauce. Simmer until the sauce has thickened.", "Stir in the frozen peas.", "Spread the meat mixture in a baking dish. Top evenly with the mashed potatoes.", "Bake at 200°C (400°F) for 20-25 minutes until the top is golden."],
        nutritionalInfo: { calories: 600, protein: "30g", carbs: "50g", fat: "30g" },
        imageUrl: "https://images.pexels.com/photos/8083658/pexels-photo-8083658.jpeg"
    },
    {
        title: "Fish and Chips",
        description: "A classic British dish of battered, deep-fried fish served with thick-cut fries.",
        cookingTime: 30,
        difficulty: "Medium",
        dietaryTags: ["british", "european"],
        servings: 2,
        ingredients: [{ name: "cod fillets", quantity: "2" }, { name: "all-purpose flour", quantity: "1 cup" }, { name: "beer", quantity: "1 cup" }, { name: "baking powder", quantity: "1 tsp" }, { name: "potatoes", quantity: "2 large, for chips" }, { name: "vegetable oil", quantity: "for frying" }],
        instructions: ["Cut potatoes into thick chips. Fry in hot oil until tender but not browned. Remove and set aside.", "For the batter, whisk together flour, baking powder, and beer until smooth.", "Pat the cod fillets dry and dip them in the batter, coating completely.", "Increase oil temperature. Fry the fish for 5-8 minutes until golden and crispy.", "Return the chips to the hot oil and fry until golden and crisp.", "Serve immediately with salt and vinegar."],
        nutritionalInfo: { calories: 850, protein: "40g", carbs: "80g", fat: "40g" },
        imageUrl: "https://images.pexels.com/photos/109554/pexels-photo-109554.jpeg"
    },
    {
        title: "Clam Chowder",
        description: "A rich, creamy New England-style chowder packed with clams and potatoes.",
        cookingTime: 40,
        difficulty: "Medium",
        dietaryTags: ["american", "soup"],
        servings: 6,
        ingredients: [{ name: "canned clams", quantity: "2 cans, with juice" }, { name: "bacon", quantity: "4 slices, chopped" }, { name: "onion", quantity: "1, chopped" }, { name: "potatoes", quantity: "2 large, diced" }, { name: "heavy cream", quantity: "2 cups" }, { name: "flour", quantity: "1/4 cup" }],
        instructions: ["In a large pot, cook bacon until crisp. Remove bacon, leaving the fat in the pot.", "Sauté onion in the bacon fat until soft.", "Stir in flour and cook for 1 minute.", "Gradually whisk in the clam juice from the cans and some water. Bring to a simmer.", "Add potatoes and cook until tender.", "Stir in the heavy cream and the clams. Heat through but do not boil. Garnish with the cooked bacon."],
        nutritionalInfo: { calories: 450, protein: "20g", carbs: "30g", fat: "30g" },
        imageUrl: "https://images.pexels.com/photos/8992916/pexels-photo-8992916.jpeg"
    },
    {
        title: "Apple Pie",
        description: "A classic American dessert with a flaky crust and a sweet, spiced apple filling.",
        cookingTime: 60,
        difficulty: "Medium",
        dietaryTags: ["american", "dessert", "vegetarian"],
        servings: 8,
        ingredients: [{ name: "pie crust", quantity: "1 package (for a double-crust pie)" }, { name: "apples", quantity: "6-8, peeled and sliced" }, { name: "sugar", quantity: "3/4 cup" }, { name: "cinnamon", quantity: "1 tsp" }, { name: "nutmeg", quantity: "1/4 tsp" }, { name: "lemon juice", quantity: "1 tbsp" }, { name: "butter", quantity: "2 tbsp" }],
        instructions: ["Preheat oven to 220°C (425°F).", "Place one pie crust in a 9-inch pie plate.", "In a large bowl, toss the apple slices with sugar, spices, and lemon juice.", "Spoon the apple mixture into the crust. Dot the top with small pieces of butter.", "Cover with the second pie crust, crimp the edges, and cut a few slits in the top for steam to escape.", "Bake for 45-55 minutes, or until the crust is golden and the filling is bubbly."],
        nutritionalInfo: { calories: 400, protein: "3g", carbs: "60g", fat: "18g" },
        imageUrl: "https://images.pexels.com/photos/1149557/pexels-photo-1149557.jpeg"
    },
    {
        title: "Chili Con Carne",
        description: "A hearty and spicy Tex-Mex stew made with chili peppers, meat, tomatoes, and beans.",
        cookingTime: 90,
        difficulty: "Easy",
        dietaryTags: ["american", "mexican"],
        servings: 8,
        ingredients: [{ name: "ground beef", quantity: "1kg" }, { name: "onion", quantity: "1, chopped" }, { name: "kidney beans", quantity: "1 can, drained" }, { name: "canned diced tomatoes", quantity: "1 can (800g)" }, { name: "beef broth", quantity: "1 cup" }, { name: "chili powder", quantity: "1/4 cup" }, { name: "cumin", quantity: "1 tbsp" }],
        instructions: ["In a large pot, brown the ground beef with the onion. Drain fat.", "Stir in the chili powder and cumin, and cook for 1 minute.", "Add the diced tomatoes and beef broth. Bring to a boil, then reduce heat and simmer for at least 1 hour, stirring occasionally.", "Stir in the kidney beans and cook for another 10 minutes.", "Serve hot with toppings like sour cream, shredded cheese, and green onions."],
        nutritionalInfo: { calories: 450, protein: "35g", carbs: "30g", fat: "20g" },
        imageUrl: "https://images.pexels.com/photos/5560604/pexels-photo-5560604.jpeg"
    },
    {
        title: "Carbonara",
        description: "A classic Roman pasta dish with eggs, cheese, cured pork, and pepper.",
        cookingTime: 20,
        difficulty: "Medium",
        dietaryTags: ["italian"],
        servings: 4,
        ingredients: [{ name: "spaghetti", quantity: "400g" }, { name: "guanciale", quantity: "150g, diced" }, { name: "eggs", quantity: "4 large" }, { name: "pecorino romano cheese", quantity: "1 cup, grated" }, { name: "black pepper", quantity: "freshly ground" }],
        instructions: ["Cook spaghetti according to package directions. Reserve some pasta water.", "While pasta cooks, fry the guanciale in a skillet until crisp. Turn off the heat.", "In a large bowl, whisk together the eggs and Pecorino cheese.", "Drain the hot pasta and immediately add it to the bowl with the egg/cheese mixture, tossing quickly to coat. The heat from the pasta will cook the eggs.", "Add the cooked guanciale and its rendered fat. Add a splash of pasta water if needed to create a creamy sauce. Top with lots of black pepper."],
        nutritionalInfo: { calories: 700, protein: "30g", carbs: "70g", fat: "35g" },
        imageUrl: "https://images.pexels.com/photos/7218525/pexels-photo-7218525.jpeg"
    },
    {
        title: "Caprese Salad",
        description: "A simple and elegant Italian salad made of fresh mozzarella, tomatoes, and sweet basil.",
        cookingTime: 10,
        difficulty: "Easy",
        dietaryTags: ["italian", "vegetarian", "gluten-free"],
        servings: 2,
        ingredients: [{ name: "ripe tomatoes", quantity: "2 large, sliced" }, { name: "fresh mozzarella", quantity: "250g, sliced" }, { name: "fresh basil leaves", quantity: "1 handful" }, { name: "extra virgin olive oil", quantity: "for drizzling" }, { name: "balsamic glaze", quantity: "for drizzling" }, { name: "salt and pepper", quantity: "to taste" }],
        instructions: ["Arrange alternating slices of tomato and mozzarella on a platter.", "Tuck fresh basil leaves in between the slices.", "Drizzle generously with high-quality olive oil and balsamic glaze.", "Season with salt and freshly ground black pepper.", "Serve immediately."],
        nutritionalInfo: { calories: 350, protein: "20g", carbs: "10g", fat: "25g" },
        imageUrl: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg"
    },
    {
        title: "Ceviche",
        description: "A South American dish of fresh raw fish cured in citrus juices, such as lemon or lime.",
        cookingTime: 20,
        difficulty: "Easy",
        dietaryTags: ["south american", "gluten-free"],
        servings: 4,
        ingredients: [{ name: "fresh white fish", quantity: "500g, cubed" }, { name: "lime juice", quantity: "1 cup" }, { name: "red onion", quantity: "1/2, thinly sliced" }, { name: "cilantro", quantity: "1/2 cup, chopped" }, { name: "chili pepper", quantity: "1, minced" }, { name: "salt", quantity: "to taste" }],
        instructions: ["In a glass bowl, combine the cubed fish and lime juice, ensuring the fish is fully submerged. Let it marinate in the refrigerator for 15-20 minutes, or until the fish becomes opaque.", "Gently stir in the red onion, cilantro, and chili pepper.", "Season with salt.", "Serve immediately with tortilla chips, sweet potato, or corn."],
        nutritionalInfo: { calories: 200, protein: "30g", carbs: "10g", fat: "5g" },
        imageUrl: "https://images.pexels.com/photos/3028500/pexels-photo-3028500.jpeg"
    },
    {
        title: "Pad Thai",
        description: "A classic Thai stir-fried noodle dish with a perfect balance of sweet, sour, and savory flavors.",
        cookingTime: 30,
        difficulty: "Medium",
        dietaryTags: ["thai", "asian"],
        servings: 2,
        ingredients: [{ name: "rice noodles", quantity: "200g" }, { name: "shrimp", quantity: "150g" }, { name: "firm tofu", quantity: "100g, cubed" }, { name: "bean sprouts", quantity: "1 cup" }, { name: "egg", quantity: "1" }, { name: "tamarind paste", quantity: "2 tbsp" }, { name: "fish sauce", quantity: "2 tbsp" }, { name: "sugar", quantity: "2 tbsp" }, { name: "peanuts", quantity: "1/4 cup, chopped" }],
        instructions: ["Soak rice noodles in warm water until pliable, then drain.", "In a wok, stir-fry tofu until golden, then add shrimp and cook through. Set aside.", "Scramble an egg in the wok and push to one side.", "Add the noodles to the wok. Pour over a sauce made from tamarind paste, fish sauce, and sugar. Toss to combine.", "Add back the tofu and shrimp, along with bean sprouts. Toss everything together.", "Serve immediately, garnished with chopped peanuts and a lime wedge."],
        nutritionalInfo: { calories: 650, protein: "30g", carbs: "90g", fat: "15g" },
        imageUrl: "https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg"
    },
    {
        title: "Peking Duck",
        description: "A famous duck dish from Beijing, prized for its thin, crisp skin.",
        cookingTime: 180,
        difficulty: "Hard",
        dietaryTags: ["chinese", "asian"],
        servings: 6,
        ingredients: [{ name: "whole duck", quantity: "1" }, { name: "maltose syrup", quantity: "1/4 cup" }, { name: "hot water", quantity: "2 tbsp" }, { name: "hoisin sauce", quantity: "for serving" }, { name: "cucumber", quantity: "for serving" }, { name: "scallions", quantity: "for serving" }, { name: "pancakes", quantity: "for serving" }],
        instructions: ["Clean the duck and pat it completely dry. Inflate the skin by pumping air between the skin and meat.", "Blanch the duck by pouring boiling water over it. Pat dry.", "Brush the duck all over with a mixture of maltose syrup and hot water. Let it air dry for several hours until the skin is like parchment.", "Roast in an oven at 180°C (350°F) for 1-1.5 hours.", "Carve the crispy skin and meat. Serve with thin pancakes, hoisin sauce, and slivers of cucumber and scallions."],
        nutritionalInfo: { calories: 900, protein: "60g", carbs: "30g", fat: "60g" },
        imageUrl: "https://images.pexels.com/photos/7757917/pexels-photo-7757917.jpeg"
    },
    {
        title: "Cobb Salad",
        description: "A classic American garden salad with chopped greens, tomato, bacon, chicken, egg, and avocado.",
        cookingTime: 20,
        difficulty: "Easy",
        dietaryTags: ["american", "gluten-free"],
        servings: 2,
        ingredients: [{ name: "romaine lettuce", quantity: "1 head, chopped" }, { name: "cooked chicken breast", quantity: "1, diced" }, { name: "bacon", quantity: "4 slices, cooked and crumbled" }, { name: "hard-boiled eggs", quantity: "2, chopped" }, { name: "avocado", quantity: "1, diced" }, { name: "tomatoes", quantity: "1 cup, chopped" }, { name: "blue cheese", quantity: "1/2 cup, crumbled" }, { name: "red wine vinaigrette", quantity: "for dressing" }],
        instructions: ["Arrange the chopped lettuce on a large platter or in individual bowls.", "Create neat rows of the chicken, bacon, hard-boiled eggs, avocado, and tomatoes over the lettuce.", "Sprinkle the crumbled blue cheese over the top.", "Drizzle with red wine vinaigrette just before serving."],
        nutritionalInfo: { calories: 650, protein: "50g", carbs: "15g", fat: "45g" },
        imageUrl: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg"
    },
    {
        title: "Beef Stroganoff",
        description: "A Russian dish of sautéed pieces of beef served in a sauce with smetana (sour cream).",
        cookingTime: 40,
        difficulty: "Medium",
        dietaryTags: ["russian", "european"],
        servings: 4,
        ingredients: [{ name: "beef sirloin", quantity: "500g, thinly sliced" }, { name: "mushrooms", quantity: "250g, sliced" }, { name: "onion", quantity: "1, chopped" }, { name: "beef broth", quantity: "1 cup" }, { name: "sour cream", quantity: "1 cup" }, { name: "dijon mustard", quantity: "1 tbsp" }, { name: "butter", quantity: "3 tbsp" }, { name: "egg noodles", quantity: "for serving" }],
        instructions: ["In a large skillet, melt butter and brown the beef strips. Remove and set aside.", "In the same skillet, sauté the onion and mushrooms until softened and browned.", "Stir in flour, then gradually whisk in the beef broth until smooth.", "Bring to a simmer and cook until thickened. Stir in the Dijon mustard.", "Reduce heat to low and stir in the sour cream. Do not let it boil.", "Return the beef to the skillet and heat through. Serve over cooked egg noodles."],
        nutritionalInfo: { calories: 600, protein: "40g", carbs: "40g", fat: "30g" },
        imageUrl: "https://images.pexels.com/photos/7141364/pexels-photo-7141364.jpeg"
    },
    {
        title: "Irish Stew",
        description: "A traditional Irish stew made from lamb or mutton, potatoes, onions, and parsley.",
        cookingTime: 120,
        difficulty: "Easy",
        dietaryTags: ["irish", "european"],
        servings: 6,
        ingredients: [{ name: "lamb shoulder", quantity: "1kg, cubed" }, { name: "potatoes", quantity: "1kg, peeled and sliced" }, { name: "onions", quantity: "2 large, sliced" }, { name: "carrots", quantity: "4, chopped" }, { name: "beef broth", quantity: "4 cups" }, { name: "thyme", quantity: "1 tsp" }, { name: "parsley", quantity: "1/4 cup, chopped" }],
        instructions: ["In a large pot, layer half of the potatoes, onions, and carrots.", "Top with the lamb cubes. Season with salt, pepper, and thyme.", "Add the remaining vegetables in another layer.", "Pour in the beef broth. Bring to a boil, then reduce heat, cover, and simmer for 1.5-2 hours, until the lamb is very tender.", "Stir in fresh parsley before serving."],
        nutritionalInfo: { calories: 550, protein: "45g", carbs: "40g", fat: "25g" },
        imageUrl: "https://images.pexels.com/photos/14845422/pexels-photo-14845422.jpeg"
    },
    {
        title: "Wiener Schnitzel",
        description: "A classic Austrian dish of a thin, breaded, pan-fried veal cutlet.",
        cookingTime: 20,
        difficulty: "Medium",
        dietaryTags: ["austrian", "european"],
        servings: 2,
        ingredients: [{ name: "veal cutlets", quantity: "2, pounded thin" }, { name: "all-purpose flour", quantity: "1/2 cup" }, { name: "egg", quantity: "1, beaten" }, { name: "breadcrumbs", quantity: "1 cup" }, { name: "butter", quantity: "for frying" }, { name: "lemon wedges", quantity: "for serving" }],
        instructions: ["Set up three shallow dishes: one with flour, one with the beaten egg, and one with breadcrumbs.", "Dredge each veal cutlet first in flour, then dip in the egg, and finally coat thoroughly with breadcrumbs.", "In a large skillet, melt enough butter to generously cover the bottom. Heat until it sizzles.", "Fry the schnitzel for 2-3 minutes per side until golden brown and crispy.", "Serve immediately with lemon wedges."],
        nutritionalInfo: { calories: 600, protein: "40g", carbs: "40g", fat: "30g" },
        imageUrl: "https://images.pexels.com/photos/8438131/pexels-photo-8438131.jpeg"
    },
    {
        title: "Chocolate Lava Cakes",
        description: "Individual chocolate cakes with a gooey, molten chocolate center.",
        cookingTime: 25,
        difficulty: "Medium",
        dietaryTags: ["vegetarian", "dessert"],
        servings: 4,
        ingredients: [{ name: "bittersweet chocolate", quantity: "120g, chopped" }, { name: "butter", quantity: "1/2 cup" }, { name: "eggs", quantity: "2" }, { name: "egg yolks", quantity: "2" }, { name: "sugar", quantity: "1/4 cup" }, { name: "all-purpose flour", quantity: "2 tbsp" }],
        instructions: ["Preheat oven to 220°C (425°F). Grease and flour four small ramekins.", "In a saucepan, melt the chocolate and butter together.", "In a separate bowl, whisk together eggs, egg yolks, and sugar until pale.", "Whisk the chocolate mixture into the egg mixture. Stir in the flour.", "Pour the batter into the prepared ramekins.", "Bake for 12-14 minutes, until the sides are firm but the center is soft.", "Let cool for a minute, then carefully invert onto plates and serve immediately."],
        nutritionalInfo: { calories: 450, protein: "8g", carbs: "30g", fat: "35g" },
        imageUrl: "https://images.pexels.com/photos/2105104/pexels-photo-2105104.jpeg"
    },
    {
        title: "Spring Rolls",
        description: "Crispy, fried rolls filled with vegetables and sometimes meat, a popular Asian appetizer.",
        cookingTime: 30,
        difficulty: "Medium",
        dietaryTags: ["asian", "appetizer"],
        servings: 12,
        ingredients: [{ name: "spring roll wrappers", quantity: "12" }, { name: "ground pork", quantity: "150g" }, { name: "cabbage", quantity: "1 cup, shredded" }, { name: "carrots", quantity: "1, julienned" }, { name: "bean sprouts", quantity: "1/2 cup" }, { name: "soy sauce", quantity: "2 tbsp" }, { name: "vegetable oil", quantity: "for frying" }],
        instructions: ["In a wok, cook the ground pork until browned. Add the cabbage and carrots and stir-fry until softened.", "Stir in the bean sprouts and soy sauce. Let the filling cool completely.", "Place a spoonful of filling onto a spring roll wrapper. Fold in the sides and roll up tightly, sealing the edge with a little water.", "Deep-fry the spring rolls in hot oil until golden brown and crispy.", "Serve with sweet chili sauce."],
        nutritionalInfo: { calories: 120, protein: "5g", carbs: "15g", fat: "5g" },
        imageUrl: "https://images.pexels.com/photos/566565/pexels-photo-566565.jpeg"
    },
    {
        title: "Ratatouille",
        description: "A traditional French Provençal stewed vegetable dish.",
        cookingTime: 60,
        difficulty: "Medium",
        dietaryTags: ["french", "vegan", "vegetarian", "gluten-free"],
        servings: 6,
        ingredients: [{ name: "eggplant", quantity: "1, diced" }, { name: "zucchini", quantity: "2, diced" }, { name: "bell peppers", quantity: "2, diced" }, { name: "onion", quantity: "1, chopped" }, { name: "canned diced tomatoes", quantity: "1 can (800g)" }, { name: "garlic", quantity: "3 cloves, minced" }, { name: "herbes de provence", quantity: "1 tsp" }],
        instructions: ["In a large pot, heat olive oil and sauté the onion until soft.", "Add the eggplant and cook for 5 minutes.", "Add the zucchini and bell peppers, and cook for another 5 minutes.", "Stir in the garlic, diced tomatoes, and herbes de provence.", "Bring to a simmer, then reduce heat, cover, and cook for 30-40 minutes, until all vegetables are tender.", "Season with salt and pepper. Serve hot or at room temperature."],
        nutritionalInfo: { calories: 150, protein: "4g", carbs: "20g", fat: "6g" },
        imageUrl: "https://images.pexels.com/photos/12833634/pexels-photo-12833634.jpeg"
    },
    {
        title: "Goulash",
        description: "A Hungarian soup or stew of meat and vegetables, seasoned with paprika.",
        cookingTime: 150,
        difficulty: "Medium",
        dietaryTags: ["hungarian", "european", "soup"],
        servings: 8,
        ingredients: [{ name: "beef chuck", quantity: "1kg, cubed" }, { name: "onions", quantity: "3, chopped" }, { name: "paprika", quantity: "1/4 cup, sweet" }, { name: "caraway seeds", quantity: "1 tbsp" }, { name: "beef broth", quantity: "4 cups" }, { name: "canned diced tomatoes", quantity: "1 can (400g)" }, { name: "potatoes", quantity: "4, diced" }, { name: "carrots", quantity: "2, sliced" }],
        instructions: ["In a large pot, brown the beef in batches. Set aside.", "In the same pot, cook the onions until soft and golden.", "Remove from heat and stir in the paprika and caraway seeds.", "Return the beef to the pot. Add the beef broth and tomatoes.", "Bring to a simmer, cover, and cook on low heat for 2 hours.", "Add the potatoes and carrots, and continue to simmer for another 30-45 minutes until vegetables are tender.", "Serve hot, often with a dollop of sour cream."],
        nutritionalInfo: { calories: 500, protein: "45g", carbs: "30g", fat: "20g" },
        imageUrl: "https://images.pexels.com/photos/14352136/pexels-photo-14352136.jpeg"
    },
    {
        title: "Doro Wat",
        description: "A spicy and iconic Ethiopian chicken stew.",
        cookingTime: 90,
        difficulty: "Medium",
        dietaryTags: ["ethiopian", "african"],
        servings: 6,
        ingredients: [{ name: "chicken pieces", quantity: "1kg" }, { name: "red onions", quantity: "4, finely chopped" }, { name: "berbere spice mix", quantity: "1/4 cup" }, { name: "niter kibbeh (spiced butter)", quantity: "1/2 cup" }, { name: "hard-boiled eggs", quantity: "6, peeled" }, { name: "ginger", quantity: "1 tbsp, grated" }, { name: "garlic", quantity: "1 tbsp, minced" }],
        instructions: ["In a large pot, cook the onions without oil over low heat for 20-30 minutes, until they release their moisture and are very soft.", "Add the niter kibbeh and cook for another 10 minutes.", "Make a paste with the berbere spice and a little water. Add to the pot and cook for 15 minutes, stirring.", "Add the chicken pieces and a cup of water. Bring to a simmer, cover, and cook for 45 minutes until the chicken is tender.", "Add the hard-boiled eggs to the stew and heat through. Serve with injera bread."],
        nutritionalInfo: { calories: 600, protein: "50g", carbs: "20g", fat: "35g" },
        imageUrl: "https://images.pexels.com/photos/6746409/pexels-photo-6746409.jpeg"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected for seeding.");
        await Recipe.deleteMany({});
        console.log("Cleared existing recipes.");
        await Recipe.insertMany(recipes);
        console.log(`Database seeded successfully with ${recipes.length} new recipes!`);
    } catch (err) {
        console.error("Seeding failed:", err);
    } finally {
        mongoose.connection.close();
        console.log("MongoDB connection closed.");
    }
};

seedDB();