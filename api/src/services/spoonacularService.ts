import axios from 'axios';

const apiKey = process.env.SPOONACULAR_API_KEY;
const baseUrl = process.env.SPOONACULAR_API;

export const searchRecipes = async (query: string) => {
  const { data } = await axios.get(`${baseUrl}/complexSearch?query=${query}&apiKey=${apiKey}`);
  return data.results;
};


export const getRecipeDetails = async (id: number) => {
  const { data } = await axios.get(`${baseUrl}/${id}/information?apiKey=${apiKey}`);
  return data;
};