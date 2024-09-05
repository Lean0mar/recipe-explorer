import { Request, Response } from 'express';
import Recipe from '../models/Recipe';
import { searchRecipes, getRecipeDetails } from '../services/spoonacularService';
import { decodeToken } from '../utils/decodedToken';

export const createRecipe = async (req: Request, res: Response) => {
  const { title, ingredients, instructions, image, sourceUrl, token } = req.body;

  console.log(req.body);
  
  const { username } = decodeToken(token);

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      image,
      sourceUrl,
      createdBy: username,
    });

    await newRecipe.save();
  res.status(201).json(newRecipe);
};

export const getRecipes = async (req: Request, res: Response) => {
  const recipes = await Recipe.find();
  res.status(200).json(recipes);
};


export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedRecipe);
};

export const deleteRecipe = async (req: Request, res: Response) => {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Receta eliminada exitosamente', recipe });
};

export const searchExternalRecipes = async (req: Request, res: Response) => {
  const results = await searchRecipes(req.query.query as string);
  res.status(200).json(results);
};

export const addRecipeFromExternal = async (req: Request, res: Response) => {
  const recipeDetails = await getRecipeDetails(req.body.id);
  const newRecipe = new Recipe({
    title: recipeDetails.title,
    ingredients: recipeDetails.extendedIngredients.map((ing: any) => ing.original),
    instructions: recipeDetails.instructions,
    image: recipeDetails.image,
    sourceUrl: recipeDetails.sourceUrl,
    createdBy: 'API',
  });
  await newRecipe.save();
  res.status(201).json(newRecipe);
};