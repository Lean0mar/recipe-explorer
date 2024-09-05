import React, { useEffect, useState } from 'react';
import { fetchUserRecipes, fetchUserFavorites } from '../../api/userApi';
import { Recipe } from '../../types';
import RecipeCard from '../../components/RecipeCard';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [userFavorites, setUserFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const currentUser = sessionStorage.getItem('username') ?? undefined;

  if (!currentUser) {
    navigate("/login");
  }

  useEffect(() => {
    const loadUserData = async () => {
      const token = sessionStorage.getItem('token');

      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const recipes = await fetchUserRecipes(token);
        const favorites = await fetchUserFavorites(token);
        setUserRecipes(recipes);
        setUserFavorites(favorites);
      } catch {
        setError('Error al obtener los datos del usuario');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  const handleDeleteRecipe = (id: string) => {
    setUserRecipes(userRecipes.filter((recipe) => recipe._id !== id));
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
      <h2 className="text-xl font-semibold mb-2">Mis Recetas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {userRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} currentUser={currentUser} onDelete={handleDeleteRecipe} />
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Mis Favoritas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userFavorites.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} isFavorite={true} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;