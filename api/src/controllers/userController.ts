import { Request, Response } from 'express';
import Recipe from '../models/Recipe';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { verifyPassword } from '../utils/cryptoUtils';
import { handleHttpError } from '../utils/errorUtils';
import { decodeToken } from '../utils/decodedToken';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email, password });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito!", user: newUser });
  } catch (error) {
    handleHttpError(res, error);
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = verifyPassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(200).json({ message: "Usuario ha iniciado sesión con éxito", token, username: user.username });
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const getUserRecipes = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    const { username } = decodeToken(token);

    const recipes = await Recipe.find({ createdBy: username });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const addFavoriteRecipe = async (req: Request, res: Response) => {
  try {
    const { token, recipeId } = req.body;
    console.log(token);
    
    const { username } = decodeToken(token);

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }

    res.status(200).json({ message: 'Receta agregada a favoritos' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const removeFavoriteRecipe = async (req: Request, res: Response) => {
  try {
    const { token, recipeId } = req.body;
    const { username } = decodeToken(token);

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.favorites = user.favorites.filter((favoriteId) => favoriteId.toString() !== recipeId);
    await user.save();

    res.status(200).json({ message: 'Receta eliminada de favoritos' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getUserFavorites = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    const { username } = decodeToken(token);

    

    const user = await User.findOne({ username }).populate('favorites');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

