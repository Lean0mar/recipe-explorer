import React from 'react';
import { Recipe } from '../../types';
import { deleteRecipe } from '../../api/recipeApi';
import { addRecipeToFavorites, removeRecipeFromFavorites } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';


interface RecipeCardProps {
  recipe: Recipe;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  currentUser?: string;
  onDelete?: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isFavorite = false, onFavoriteToggle, currentUser, onDelete }) => {
  const navigate = useNavigate();

  const handleFavoriteToggle = async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      if (isFavorite) {
        await removeRecipeFromFavorites(token, recipe._id!);
      } else {
        await addRecipeToFavorites(token, recipe._id!);
      }
      if (onFavoriteToggle) onFavoriteToggle();
    } catch (error) {
      console.error('Error con el handler de favoritos', error);
    }
  };

  const handleEditClick = () => {
    navigate(`/recipe/edit/${recipe._id}`);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteRecipe(recipe._id!);
      if (onDelete) onDelete(recipe._id!);
    } catch (error) {
      console.error('Hubo un error al eliminar la receta', error);
    }
  };

  const handleViewDetailsClick = () => {
    navigate(`/recipe/${recipe._id}`);
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-lg flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-lg duration-300 relative border border-gray-300">
      {recipe.image ? (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-40 object-cover rounded-t-md mb-4"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-t-md mb-4">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-2 text-gray-900">{recipe.title}</h2>
        <p className="text-gray-700 mb-4 text-sm">
          {recipe.instructions ? recipe.instructions.replace(/<[^>]+>/g, '').slice(0, 100) + '...' : 'No description available'}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4 space-x-2">
        <button
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-sm focus:outline-none"
          onClick={handleViewDetailsClick}
        >
          View Details
        </button>
        <button
          className="text-red-500 text-2xl focus:outline-none"
          onClick={handleFavoriteToggle}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      {currentUser === recipe.createdBy && (
        <div className="mt-4 flex justify-between space-x-2">
          <button
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-all duration-300 shadow-md focus:outline-none"
            onClick={handleEditClick}
          >
            Editar
          </button>
          <button
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-300 shadow-md focus:outline-none"
            onClick={handleDeleteClick}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
