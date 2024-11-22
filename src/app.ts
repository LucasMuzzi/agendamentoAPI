import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Importe o CORS
import connectToDatabase from "./config/mongodatabase";
import userRoute from "./routes/userRoute";
import errorMiddleware from "./middleware/errorMiddleware";
import appointmentRoute from "./routes/appointmentRoute";

dotenv.config();

const app = express();

// Configuração do CORS
app.use(cors());

app.use(express.json());

connectToDatabase();

app.use("/api", userRoute);
app.use("/api", appointmentRoute);

app.use(errorMiddleware);

export default app;
