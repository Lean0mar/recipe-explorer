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
exports.getRecipeDetails = exports.searchRecipes = void 0;
const axios_1 = __importDefault(require("axios"));
const apiKey = process.env.SPOONACULAR_API_KEY;
const baseUrl = process.env.SPOONACULAR_API;
const searchRecipes = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`${baseUrl}/complexSearch?query=${query}&apiKey=${apiKey}`);
    return data.results;
});
exports.searchRecipes = searchRecipes;
const getRecipeDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`${baseUrl}/${id}/information?apiKey=${apiKey}`);
    return data;
});
exports.getRecipeDetails = getRecipeDetails;
