import { Recipe } from '../types';

const API_URL = import.meta.env.VITE_USERS_API_URL;

import { User } from '../types';
export const registerUser = async (user: User): Promise<void> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Error registering user");
  return response.json();
};

export const loginUser = async (user: { email: string; password: string }): Promise<string> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Invalid credentials");
  const data = await response.json();

  sessionStorage.setItem('token', data.token);
  sessionStorage.setItem('username', data.username);
  return data.token;
};

export const fetchUserRecipes = async (token: string): Promise<Recipe[]> => {
  const response = await fetch(`${API_URL}/my-recipes?token=${token}`, {
    method: 'GET',
  });
  if (!response.ok) throw new Error('Error fetching user recipes');
  return response.json() as Promise<Recipe[]>;
};

export const addRecipeToFavorites = async (token: string, recipeId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, recipeId }),
  });
  if (!response.ok) throw new Error('Error adding recipe to favorites');
};

export const removeRecipeFromFavorites = async (token: string, recipeId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/favorite`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, recipeId }),
  });
  if (!response.ok) throw new Error('Error removing recipe from favorites');
};

export const fetchUserFavorites = async (token: string): Promise<Recipe[]> => {
  const response = await fetch(`${API_URL}/my-favorites?token=${token}`, {
    method: 'GET',
  });
  if (!response.ok) throw new Error('Error fetching user favorites');
  return response.json() as Promise<Recipe[]>;
};