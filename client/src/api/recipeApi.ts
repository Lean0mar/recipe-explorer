import { Recipe } from '../types';

const API_URL = import.meta.env.VITE_RECIPES_API_URL;

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error("Error fetching recipes");
  return response.json() as Promise<Recipe[]>;
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Error fetching recipe");
  return response.json() as Promise<Recipe>;
};

export const createRecipe = async (recipe: Recipe): Promise<Recipe> => {
    const token = sessionStorage.getItem('token');
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...recipe, token }),
  });
  if (!response.ok) throw new Error("Error creating recipe");
  return response.json() as Promise<Recipe>;
};

export const updateRecipe = async (id: string, recipe: Recipe): Promise<Recipe> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });
  if (!response.ok) throw new Error("Error updating recipe");
  return response.json() as Promise<Recipe>;
};

export const deleteRecipe = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting recipe");
};

export const searchExternalRecipes = async (query: string): Promise<Recipe[]> => {
  const response = await fetch(`${API_URL}/spoonacular-service/search?query=${query}`);
  console.log(response);
  
  if (!response.ok) throw new Error("Error searching external recipes");
  return response.json() as Promise<Recipe[]>;
};

export const addRecipeFromExternal = async (id: string): Promise<Recipe> => {
  const response = await fetch(`${API_URL}/external`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: Number(id) }),
  });
  if (!response.ok) throw new Error("Error adding recipe from external API");
  return response.json() as Promise<Recipe>;
};