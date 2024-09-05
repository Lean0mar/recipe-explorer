import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from '../../api/recipeApi';
import { Recipe } from '../../types';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';


const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const foundRecipe = await fetchRecipeById(id!);
        setRecipe(foundRecipe);
      } catch {
        setError("Error al obtener la receta");
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!recipe) return <div className="text-center mt-4">Receta no encontrada.</div>;

  return (
    <>
    <Navbar />
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-8 bg-gray-50">
      <div className="flex-1 max-w-2xl p-8 bg-white shadow-lg rounded-lg mb-8 md:mb-0">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900">{recipe.title}</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ingredientes</h2>
        <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="ml-4">{ingredient}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Instrucciones</h2>
        <p className="text-gray-700 leading-7 whitespace-pre-line">{recipe.instructions.replace(/<[^>]+>/g, '')}</p>
      </div>

      {recipe.image && (
        <div className="md:ml-8 flex-none max-w-md">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-auto rounded-lg shadow-xl transform transition duration-500 hover:scale-105"
          />
        </div>
      )}
    </div>
    </>
  );
};

export default RecipeDetail;