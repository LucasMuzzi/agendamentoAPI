import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('Erro: A variável de ambiente MONGODB_URI não foi definida');
  process.exit(1);
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri); 
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); 
  }
};

export default connectToDatabase;
