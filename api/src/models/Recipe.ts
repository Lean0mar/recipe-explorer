import { Schema, model } from 'mongoose';

const RecipeSchema = new Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  image: { type: String },
  sourceUrl: { type: String },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model('Recipe', RecipeSchema);