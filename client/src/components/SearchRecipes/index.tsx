import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { searchExternalRecipes, addRecipeFromExternal } from '../../api/recipeApi';
import { Recipe } from '../../types';
import Loader from '../../components/Loader';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import img from '../../assets/vegetables.jpg';

const SearchExternalRecipes: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const results = await searchExternalRecipes(query);
      setRecipes(results);
      console.log(recipes);
      
    } catch (err) {
      console.error('Error al buscar recetas externas desde el frontend:', err);
      setError('Error al buscar recetas externas');
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al buscar recetas externas. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecipe = async (id: string) => {
    if (!id) {
      Swal.fire({
        title: 'Error',
        text: 'ID de receta no válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    try {
      await addRecipeFromExternal(id);
      Swal.fire({
        title: '¡Receta añadida!',
        text: 'La receta se ha añadido a tu colección con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (err) {
      console.error('Error al añadir la receta desde la API externa:', err);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo añadir la receta desde la API externa. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col items-center justify-center min-h-screen p-4"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-2xl w-full text-center">
          <h1 className="text-3xl font-bold mb-6">Buscar Recetas Externas</h1>
          <div className="flex mb-4 justify-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar recetas..."
              className="border border-gray-300 rounded-l-lg px-4 py-2 w-64 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
            >
              Buscar
            </button>
          </div>

          {loading && <Loader />}
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="p-4 bg-white shadow-md rounded-lg flex flex-col justify-between">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-bold mb-2 text-gray-800">{recipe.title}</h2>
                <button
                  onClick={() => handleAddRecipe(recipe.id!)}
                  className="mt-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Añadir a Mis Recetas
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchExternalRecipes;