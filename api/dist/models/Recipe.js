"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RecipeSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    image: { type: String },
    sourceUrl: { type: String },
    createdBy: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)('Recipe', RecipeSchema);
