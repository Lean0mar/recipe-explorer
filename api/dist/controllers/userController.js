"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFavorites = exports.removeFavoriteRecipe = exports.addFavoriteRecipe = exports.getUserRecipes = exports.loginUser = exports.registerUser = void 0;
const Recipe_1 = __importDefault(require("../models/Recipe"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cryptoUtils_1 = require("../utils/cryptoUtils");
const errorUtils_1 = require("../utils/errorUtils");
const decodedToken_1 = require("../utils/decodedToken");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const newUser = new User_1.default({ username, email, password });
        yield newUser.save();
        res.status(201).json({ message: "Usuario registrado con éxito!", user: newUser });
    }
    catch (error) {
        (0, errorUtils_1.handleHttpError)(res, error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const isMatch = (0, cryptoUtils_1.verifyPassword)(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }
        const token = jsonwebtoken_1.default.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Usuario ha iniciado sesión con éxito", token, username: user.username });
    }
    catch (error) {
        (0, errorUtils_1.handleHttpError)(res, error);
    }
});
exports.loginUser = loginUser;
const getUserRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.query.token;
        const { username } = (0, decodedToken_1.decodeToken)(token);
        const recipes = yield Recipe_1.default.find({ createdBy: username });
        res.status(200).json(recipes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserRecipes = getUserRecipes;
const addFavoriteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, recipeId } = req.body;
        console.log(token);
        const { username } = (0, decodedToken_1.decodeToken)(token);
        const user = yield User_1.default.findOne({ username });
        if (!user)
            return res.status(404).json({ message: 'Usuario no encontrado' });
        if (!user.favorites.includes(recipeId)) {
            user.favorites.push(recipeId);
            yield user.save();
        }
        res.status(200).json({ message: 'Receta agregada a favoritos' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.addFavoriteRecipe = addFavoriteRecipe;
const removeFavoriteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, recipeId } = req.body;
        const { username } = (0, decodedToken_1.decodeToken)(token);
        const user = yield User_1.default.findOne({ username });
        if (!user)
            return res.status(404).json({ message: 'Usuario no encontrado' });
        user.favorites = user.favorites.filter((favoriteId) => favoriteId.toString() !== recipeId);
        yield user.save();
        res.status(200).json({ message: 'Receta eliminada de favoritos' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.removeFavoriteRecipe = removeFavoriteRecipe;
const getUserFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.query.token;
        const { username } = (0, decodedToken_1.decodeToken)(token);
        const user = yield User_1.default.findOne({ username }).populate('favorites');
        if (!user)
            return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user.favorites);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserFavorites = getUserFavorites;
