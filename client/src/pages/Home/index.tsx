import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../../components/RecipeCard';
import { fetchRecipes } from '../../api/recipeApi';
import { Recipe } from '../../types';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FaPizzaSlice, FaLeaf, FaHamburger } from 'react-icons/fa';
import img from '../../assets/vegetables.jpg';
import Loader from '../../components/Loader'

const Home: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const data = await fetchRecipes();
                const randomRecipes = data.sort(() => 0.5 - Math.random()).slice(0, 3);
                setRecipes(randomRecipes);
            } catch (error) {
                console.error("Error fetching recipes:", error);
                setError("Error fetching recipes");
            } finally {
                setLoading(false);
            }
        };

        loadRecipes();
    }, []);

    const handleExploreRecipesClick = () => {
        const isLoggedIn = !!sessionStorage.getItem('token');

        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate('/recipes');
        }
    };

    if (loading) return <Loader />
    if (error) return <div>{error}</div>;

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="relative rounded-lg overflow-hidden mb-12">
                    <div
                        className="h-[400px] flex items-center justify-center relative"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <div className="relative z-10 text-center p-8 text-white">
                            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-md">Bienvenido a Recipe Explorer</h1>
                            <p className="text-2xl mb-6 drop-shadow-sm">
                                Descubre nuevas recetas, guarda tus favoritas y explora platos deliciosos de todo el mundo.
                            </p>
                            <button
                                onClick={handleExploreRecipesClick}
                                className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
                            >
                                Explorar Recetas
                            </button>
                        </div>
                    </div>
                </div>


                <div className="bg-gray-900 text-white p-8 rounded-lg mb-12 shadow-md">
                    <h2 className="text-3xl font-bold mb-6 text-white">Recetas Destacadas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recipes.map(recipe => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg text-center mx-auto max-w-3xl w-full border border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-800">¡Descubre tu Próxima Comida Favorita!</h2>
                    <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                        Desde platos clásicos hasta nuevas creaciones culinarias, exploramos los sabores del mundo para brindarte lo mejor en recetas.
                    </p>
                    <div className="flex justify-center space-x-6 mb-4">
                        <FaPizzaSlice className="text-4xl text-blue-600" />
                        <FaLeaf className="text-4xl text-green-600" />
                        <FaHamburger className="text-4xl text-yellow-600" />
                    </div>
                    <button
                        onClick={handleExploreRecipesClick}
                        className="mt-4 inline-block bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
                    >
                        ¡Empieza a explorar recetas ahora!
                    </button>
                </div>


            </div>
            <Footer />
        </>
    );
};

export default Home;