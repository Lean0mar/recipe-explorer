import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../config/db';
import Recipe from '../models/Recipe';
import { searchRecipes, getRecipeDetails } from '../services/spoonacularService';


connectDB();

const categories = ['pasta', 'chicken', 'dessert', 'salad', 'soup'];

const populateDB = async () => {
  try {
    for (let category of categories) {
      const recipes = await searchRecipes(category);

      for (let recipe of recipes) {
        const details = await getRecipeDetails(recipe.id);
        const newRecipe = new Recipe({
          title: details.title,
          ingredients: details.extendedIngredients.map((ing: any) => ing.original),
          instructions: details.instructions,
          image: details.image,
          sourceUrl: details.sourceUrl,
          createdBy: 'API',
        });

        await newRecipe.save();
      }
    }

    console.log('Base de datos llena de varias recetas nuevas!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

populateDB();