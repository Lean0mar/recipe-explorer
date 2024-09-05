import React, { useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCard';
import { fetchRecipes } from '../../api/recipeApi';
import { Recipe } from '../../types';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';
import Footer from '../../components/Footer';

const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recipesPerPage] = useState<number>(6);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch {
        setError("Hubo un error al obtener las recetas!");
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <input
          type="text"
          placeholder="Buscar recetas..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentRecipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(filteredRecipes.length / recipesPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 border ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecipesPage;