import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createRecipe, fetchRecipeById, updateRecipe } from '../../api/recipeApi';
import { Recipe } from '../../types';
import RecipeForm from '../../components/RecipeForm';
import Loader from '../../components/Loader';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const RecipeFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(!!id);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const loadRecipe = async () => {
        try {
          const recipeData = await fetchRecipeById(id);
          setRecipe(recipeData);
        } catch {
          setError('Error al obtener los detalles de la receta');
        } finally {
          setLoading(false);
        }
      };

      loadRecipe();
    }
  }, [id]);

  const handleSubmit = async (recipeData: Recipe) => {
    try {
      if (id) {
        await updateRecipe(id, recipeData);
        Swal.fire({
          title: 'Receta actualizada',
          text: '¡La receta ha sido actualizada con éxito!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } else {
        await createRecipe(recipeData);
        Swal.fire({
          title: 'Receta creada',
          text: '¡La receta ha sido creada con éxito!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }
      navigate('/');
    } catch (err) {
      console.error('Error al guardar la receta', err);
      setError('Error al guardar la receta');
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al guardar la receta. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Reintentar',
      });
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {id ? 'Editar Receta' : 'Crear Receta'}
        </h1>
        <RecipeForm
          initialData={
            recipe || {
              title: '',
              ingredients: [],
              instructions: '',
              image: '',
              sourceUrl: '',
              createdBy: '',
            }
          }
          onSubmit={handleSubmit}
        />
      </div>
    </div>
    <Footer />
    </>
  );
};

export default RecipeFormPage;