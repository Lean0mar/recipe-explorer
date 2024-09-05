import dotenv from 'dotenv';
dotenv.config();

import Recipe from '../models/Recipe';
import { searchRecipes, getRecipeDetails } from '../services/spoonacularService';

const categories = ['pasta', 'soup'];

export const populateDB = async () => {
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
  } catch (err) {
    console.error('Error poblando la base de datos:', err);
  }
};