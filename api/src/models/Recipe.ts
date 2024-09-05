import { Schema, model } from 'mongoose';

const RecipeSchema = new Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  image: { type: String },
  sourceUrl: { type: String },
  createdBy: { type: String, required: true },
});

export default model('Recipe', RecipeSchema);