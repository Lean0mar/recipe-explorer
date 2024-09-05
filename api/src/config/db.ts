import mongoose from 'mongoose';
import Recipe from '../models/Recipe';
import { populateDB } from '../scripts/populateRecipes';

const mongoURL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL!, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Conectado a MongoDB');

    const recipeCount = await Recipe.countDocuments();

    if (recipeCount === 0) {
      console.log('No se encontraron recetas. Ejecutando script de población...');
      await populateDB();
    } else {
      console.log('La base de datos ya contiene datos. No se ejecutará el script de población.');
    }
  } catch (error) {
    console.log(error);
    
    console.error((error as Error).message);
    process.exit(1);
  }
};

export default connectDB;