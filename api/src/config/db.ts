import mongoose from 'mongoose';

const mongoURL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL!, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.log(error);
    
    console.error((error as Error).message);
    process.exit(1);
  }
};

export default connectDB;