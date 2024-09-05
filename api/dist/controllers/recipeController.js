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
exports.addRecipeFromExternal = exports.searchExternalRecipes = exports.deleteRecipe = exports.updateRecipe = exports.getRecipeById = exports.getRecipes = exports.createRecipe = void 0;
const Recipe_1 = __importDefault(require("../models/Recipe"));
const spoonacularService_1 = require("../services/spoonacularService");
const decodedToken_1 = require("../utils/decodedToken");
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, ingredients, instructions, image, sourceUrl, token } = req.body;
    console.log(req.body);
    const { username } = (0, decodedToken_1.decodeToken)(token);
    const newRecipe = new Recipe_1.default({
        title,
        ingredients,
        instructions,
        image,
        sourceUrl,
        createdBy: username,
    });
    yield newRecipe.save();
    res.status(201).json(newRecipe);
});
exports.createRecipe = createRecipe;
const getRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield Recipe_1.default.find();
    res.status(200).json(recipes);
});
exports.getRecipes = getRecipes;
const getRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield Recipe_1.default.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getRecipeById = getRecipeById;
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedRecipe = yield Recipe_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRecipe);
});
exports.updateRecipe = updateRecipe;
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield Recipe_1.default.findById(req.params.id);
    if (!recipe) {
        return res.status(404).json({ message: 'Receta no encontrada' });
    }
    yield Recipe_1.default.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Receta eliminada exitosamente', recipe });
});
exports.deleteRecipe = deleteRecipe;
const searchExternalRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield (0, spoonacularService_1.searchRecipes)(req.query.query);
    res.status(200).json(results);
});
exports.searchExternalRecipes = searchExternalRecipes;
const addRecipeFromExternal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeDetails = yield (0, spoonacularService_1.getRecipeDetails)(req.body.id);
    const newRecipe = new Recipe_1.default({
        title: recipeDetails.title,
        ingredients: recipeDetails.extendedIngredients.map((ing) => ing.original),
        instructions: recipeDetails.instructions,
        image: recipeDetails.image,
        sourceUrl: recipeDetails.sourceUrl,
        createdBy: 'API',
    });
    yield newRecipe.save();
    res.status(201).json(newRecipe);
});
exports.addRecipeFromExternal = addRecipeFromExternal;
