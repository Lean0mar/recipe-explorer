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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = __importDefault(require("../config/db"));
const Recipe_1 = __importDefault(require("../models/Recipe"));
const spoonacularService_1 = require("../services/spoonacularService");
(0, db_1.default)();
const categories = ['pasta', 'chicken', 'dessert', 'salad', 'soup'];
const populateDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (let category of categories) {
            const recipes = yield (0, spoonacularService_1.searchRecipes)(category);
            for (let recipe of recipes) {
                const details = yield (0, spoonacularService_1.getRecipeDetails)(recipe.id);
                const newRecipe = new Recipe_1.default({
                    title: details.title,
                    ingredients: details.extendedIngredients.map((ing) => ing.original),
                    instructions: details.instructions,
                    image: details.image,
                    sourceUrl: details.sourceUrl,
                    createdBy: 'API',
                });
                yield newRecipe.save();
            }
        }
        console.log('Base de datos llena de varias recetas nuevas!');
        process.exit();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
populateDB();
