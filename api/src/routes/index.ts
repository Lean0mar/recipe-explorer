import { Router } from 'express';
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  searchExternalRecipes,
  addRecipeFromExternal,
} from '../controllers/recipeController';
import { registerUser, loginUser, getUserRecipes, getUserFavorites, addFavoriteRecipe, removeFavoriteRecipe } from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Crea una nueva receta
 *     description: Crea una nueva receta en la base de datos.
 *     tags:
 *       - Recetas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título de la receta
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de ingredientes
 *               instructions:
 *                 type: string
 *                 description: Instrucciones para preparar la receta
 *               image:
 *                 type: string
 *                 description: URL de la imagen de la receta
 *               sourceUrl:
 *                 type: string
 *                 description: URL fuente de la receta
 *               token:
 *                 type: string
 *                 description: Token de autenticación del usuario
 *     responses:
 *       201:
 *         description: Receta creada exitosamente
 *       400:
 *         description: Datos de entrada no válidos
 */
router.post('/recipes/', createRecipe);

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Obtiene todas las recetas
 *     description: Recupera una lista de todas las recetas almacenadas en la base de datos.
 *     tags:
 *       - Recetas
 *     responses:
 *       200:
 *         description: Lista de recetas
 */
router.get('/recipes/', getRecipes);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Obtiene una receta por ID
 *     description: Recupera una receta específica basada en su ID.
 *     tags:
 *       - Recetas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la receta
 *     responses:
 *       200:
 *         description: Receta encontrada
 *       404:
 *         description: Receta no encontrada
 */
router.get('/recipes/:id', getRecipeById);

/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     summary: Actualiza una receta
 *     description: Actualiza una receta existente basada en su ID.
 *     tags:
 *       - Recetas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la receta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título de la receta
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de ingredientes
 *               instructions:
 *                 type: string
 *                 description: Instrucciones para preparar la receta
 *               image:
 *                 type: string
 *                 description: URL de la imagen de la receta
 *               sourceUrl:
 *                 type: string
 *                 description: URL fuente de la receta
 *     responses:
 *       200:
 *         description: Receta actualizada exitosamente
 *       404:
 *         description: Receta no encontrada
 */
router.put('/recipes/:id', updateRecipe);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Elimina una receta
 *     description: Elimina una receta existente basada en su ID.
 *     tags:
 *       - Recetas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la receta a eliminar
 *     responses:
 *       204:
 *         description: Receta eliminada exitosamente
 *       404:
 *         description: Receta no encontrada
 */
router.delete('/recipes/:id', deleteRecipe);

/**
 * @swagger
 * /recipes/search:
 *   get:
 *     summary: Busca recetas externas
 *     description: Busca recetas en un servicio externo utilizando un término de búsqueda.
 *     tags:
 *       - Recetas Externas
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: El término de búsqueda para encontrar recetas externas
 *     responses:
 *       200:
 *         description: Resultados de búsqueda de recetas
 */
router.get('/recipes/spoonacular-service/search', searchExternalRecipes);

/**
 * @swagger
 * /recipes/external:
 *   post:
 *     summary: Agrega una receta desde un servicio externo
 *     description: Agrega una receta a la base de datos utilizando los detalles obtenidos de un servicio externo.
 *     tags:
 *       - Recetas Externas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: El ID de la receta en el servicio externo
 *     responses:
 *       201:
 *         description: Receta creada a partir del servicio externo
 */
router.post('/recipes/external', addRecipeFromExternal);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Registra un nuevo usuario en la aplicación.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Error en los datos de registro
 */
router.post('/users/register', registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     description: Permite a un usuario iniciar sesión.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *       400:
 *         description: Credenciales inválidas
 */
router.post('/users/login', loginUser);

/**
 * @swagger
 * /users/my-recipes:
 *   get:
 *     summary: Obtiene las recetas del usuario
 *     description: Recupera todas las recetas creadas por el usuario autenticado.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de autenticación del usuario
 *     responses:
 *       200:
 *         description: Lista de recetas del usuario
 */
router.get('/users/my-recipes', getUserRecipes);

/**
 * @swagger
 * /users/favorite:
 *   post:
 *     summary: Agrega una receta a favoritos
 *     description: Agrega una receta a la lista de favoritos del usuario.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de autenticación del usuario
 *               recipeId:
 *                 type: string
 *                 description: ID de la receta a agregar
 *     responses:
 *       200:
 *         description: Receta agregada a favoritos
 */
router.post('/users/favorite', addFavoriteRecipe);

/**
 * @swagger
 * /users/favorite:
 *   delete:
 *     summary: Elimina una receta de favoritos
 *     description: Elimina una receta de la lista de favoritos del usuario.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de autenticación del usuario
 *               recipeId:
 *                 type: string
 *                 description: ID de la receta a eliminar
 *     responses:
 *       200:
 *         description: Receta eliminada de favoritos
 */
router.delete('/users/favorite', removeFavoriteRecipe);

/**
 * @swagger
 * /users/my-favorites:
 *   get:
 *     summary: Obtiene recetas favoritas del usuario
 *     description: Recupera todas las recetas marcadas como favoritas por el usuario.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de autenticación del usuario
 *     responses:
 *       200:
 *         description: Lista de recetas favoritas del usuario
 */
router.get('/users/my-favorites', getUserFavorites);

export default router;