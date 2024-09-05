# Recipe Explorer CLIENT
<br/>

<p align="center">
  <img src="./src/assets/Recipe-Explorer.jpg" alt="Logo del Proyecto" width="200">
</p>

Este es el frontend del proyecto **Recipe Explorer**, una aplicación web desarrollada en **React** y **Vite** con **TypeScript** que permite a los usuarios explorar, buscar, y gestionar recetas de cocina. El frontend consume una API RESTful desarrollada en Express y conectada a MongoDB, proporcionando una interfaz de usuario moderna e intuitiva.

## **Requisitos Previos**

- **Node.js** (v14 o superior)
- **npm** (v6 o superior)

## **Instalación**

1. Clona el repositorio e ingresa al directorio del frontend:
   ```bash
   git clone <URL-del-repositorio>
   cd client
   ```

2. Instala todas las dependencias necesarias:
   ```bash
   npm install
   ```

## **Ejecución del Proyecto**

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
```

El frontend se ejecutará en `http://localhost:5173` (o en otro puerto que Vite elija).

Asegúrate de que el backend esté corriendo en `http://localhost:3001` para que las llamadas a la API funcionen correctamente.

## **Build para Producción**

Para construir la aplicación para producción, ejecuta:

```bash
npm run build
```

Esto generará una carpeta `dist` con los archivos estáticos listos para ser desplegados.

Para previsualizar la build de producción, ejecuta:

```bash
npm run preview
```

## **Funcionalidades Principales**

- **Registro de Usuario:** Permite a los usuarios crear una cuenta.
- **Inicio de Sesión:** Permite a los usuarios autenticarse.
- **Operaciones CRUD:** Crear, Leer, Actualizar y Eliminar recetas.
- **Exploración de Recetas:** Buscar y visualizar recetas desde una API externa.
- **Interfaz de Usuario con TailwindCSS:** Estilos modernos y responsivos para una mejor experiencia de usuario.
- **Alertas de Usuario con SweetAlert2:** Utiliza SweetAlert2 para notificaciones y alertas interactivas.

## **Dependencias Utilizadas**

- **React**: Biblioteca principal para la construcción de la interfaz de usuario.
- **TypeScript**: Superset de JavaScript para el tipado estático.
- **Vite**: Herramienta de desarrollo rápida para aplicaciones web modernas.
- **TailwindCSS**: Framework de CSS para estilos rápidos y responsivos.
- **axios**: Cliente HTTP para las solicitudes a la API del backend.
- **react-router-dom**: Biblioteca de enrutamiento para manejar la navegación.
- **SweetAlert2**: Biblioteca para mostrar alertas interactivas y modernas.
- **react-icons**: Colección de iconos para usar en componentes de React.

## **Contribución**

Las contribuciones son bienvenidas. Para contribuir, sigue estos pasos:

1. Realiza un Fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## **Licencia**

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.