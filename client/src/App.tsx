import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import RecipesPage from './pages/RecipesPage';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipeFormPage from './pages/RecipeFromPage';
import ProtectedRoute from './components/ProtectedRoute';
import SearchExternalRecipes from './components/SearchRecipes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/recipe/create" element={<RecipeFormPage />} />
        <Route path="/recipe/edit/:id" element={<RecipeFormPage />} />
        <Route path="/search-external" element={<SearchExternalRecipes />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;