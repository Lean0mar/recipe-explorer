import React, { useState } from 'react';
import { Recipe } from '../../types';

interface RecipeFormProps {
  initialData: Recipe;
  onSubmit: (recipeData: Recipe) => Promise<void>;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title);
  const [ingredients, setIngredients] = useState(initialData.ingredients.join(', '));
  const [instructions, setInstructions] = useState(initialData.instructions);
  const [image, setImage] = useState(initialData.image || '');
  const [sourceUrl, setSourceUrl] = useState(initialData.sourceUrl || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ingredientsArray = ingredients.split(',').map((ingredient) => ingredient.trim());
    await onSubmit({ ...initialData, title, ingredients: ingredientsArray, instructions, image, sourceUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <div className="mb-4">
        <label className="block text-gray-700">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Ingredientes (separados por coma)</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Instrucciones</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">URL de la Imagen</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">URL de la Fuente</label>
        <input
          type="text"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Guardar Receta
      </button>
    </form>
  );
};

export default RecipeForm;