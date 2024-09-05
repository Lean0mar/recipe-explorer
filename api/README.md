# Recipe Explorer API
<br/>

<p align="center">
  <img src="../client/src/assets/Recipe-Explorer.jpg" alt="Logo del Proyecto" width="200">
</p>

API backend para gestionar recetas y usuarios, incluyendo funcionalidades para buscar recetas en un servicio externo y gestionar recetas favoritas de los usuarios. Desarrollado con **Node.js**, **Express**, **TypeScript**, y **MongoDB**.

## Requisitos

- Node.js v14 o superior
- MongoDB
- Clave API de [Spoonacular](https://spoonacular.com/food-api) para obtener recetas externas

## Instalación

1. Clona el repositorio:

    ```bash
    git clone <URL-del-repositorio>
    cd recipe-explorer
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

    ```plaintext
    MONGO_URI=mongodb://localhost:27017/recipe-explorer
    SPOONACULAR_API_KEY=<tu_clave_api>
    PORT=3001
    ```

## Ejecución

### Modo de desarrollo

Para ejecutar en modo desarrollo con **nodemon**:

```bash
npm run dev
```

### Modo de producción
Para compilar y ejecutar en modo producción:

```bash
npm run build
npm start
```

## Endpoints
La API expone los siguientes endpoints:

### Recetas
- `POST /recipes`: Crea una nueva receta.

- `GET /recipes`: Obtiene todas las recetas.

- `GET /recipes/:id`: Obtiene una receta específica por ID.

- `PUT /recipes/:id`: Actualiza una receta existente.

- `DELETE /recipes/:id`: Elimina una receta por ID.

- `GET /recipes/spoonacular-service/search`: Busca recetas externas usando Spoonacular API.

- `POST /recipes/external`: Agrega una receta desde un servicio externo.

### Usuarios
- `POST /users/register`: Registra un nuevo usuario.

- `POST /users/login`: Inicia sesión de un usuario.

- `GET /users/my-recipes`: Obtiene las recetas del usuario autenticado.

- `GET /users/my-favorites`: Obtiene las recetas favoritas del usuario autenticado.

- `POST /users/favorite`: Agrega una receta a la lista de favoritos del usuario.

- `DELETE /users/favorite`: Elimina una receta de la lista de favoritos del usuario.

## Documentación de la API
La documentación de la API está disponible usando Swagger. Una vez que la aplicación esté en ejecución, accede a:

```plaintext
http://localhost:3001/api-docs
```

## Scripts
- `npm run dev`: Ejecuta el servidor en modo desarrollo con nodemon.

- `npm run build`: Compila el código TypeScript a JavaScript.

- `npm start`: Inicia el servidor con el código compilado.

## Tecnologías utilizadas
- Node.js: Entorno de ejecución para JavaScript en el servidor.

- Express: Framework de servidor web para Node.js.

- TypeScript: Superconjunto tipado de JavaScript.

- MongoDB: Base de datos NoSQL utilizada para almacenamiento de datos.

- Mongoose: ODM para MongoDB y Node.js.

- crypto-js: Biblioteca para encriptación y manejo seguro de contraseñas.

- Swagger: Herramienta para documentación de API.

- Spoonacular API: Servicio externo para buscar recetas.

## Despliegue
Para desplegar la aplicación en un servidor de producción, asegúrate de que las variables de entorno estén configuradas correctamente y que MongoDB esté accesible.

1. Configura las variables de entorno en el servidor de producción.

2. Ejecuta `npm run build` para compilar el código TypeScript.

3. Usa `npm start` para iniciar la aplicación en producción.

### **Cómo Usar Insomnia para Probar la API**

1. **URL Base:**
   Utiliza `http://localhost:3001` como la URL base para todas las solicitudes mientras ejecutas tu servidor local.

2. **Solicitudes de Ejemplo:**

- **Registro de Usuario:**
  - Método: `POST`
  - URL: `http://localhost:3001/api/users/register`
  - Body (JSON):
    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "password123"
    }
    ```

- **Inicio de Sesión:**
  - Método: `POST`
  - URL: `http://localhost:3001/api/users/login`
  - Body (JSON):
    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```

- **Crear Receta:**
  - Método: `POST`
  - URL: `http://localhost:3001/api/recipes`
  - Body (JSON):
    ```json
    {
      "title": "Pizza Margherita",
      "ingredients": ["Tomato", "Mozzarella", "Basil", "Olive Oil"],
      "instructions": "Mix ingredients and bake.",
      "image": "http://example.com/pizza.jpg",
      "sourceUrl": "http://example.com/recipe",
      "token": "<token-del-usuario>"
    }
    ```

### Autor
Leandro Martinez

### Licencia
Este proyecto está bajo la licencia ISC.