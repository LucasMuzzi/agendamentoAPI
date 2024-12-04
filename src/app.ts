import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Importe o CORS
import connectToDatabase from "./config/mongodatabase";
import userRoute from "./routes/userRoute";
import errorMiddleware from "./middleware/errorMiddleware";
import appointmentRoute from "./routes/appointmentRoute";
import registerRoute from "./routes/clientRoute";
import settingsRoute from "./routes/settingsRoute";
import path from "path";

dotenv.config();

const app = express();

// Configuração do CORS
app.use(cors());

app.use(express.json());

connectToDatabase();

app.use("/api", userRoute);
app.use("/api", appointmentRoute);
app.use("/api", registerRoute);
app.use("/api", settingsRoute);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Manter API ativa
app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "API is running!",
    timestamp: new Date().toISOString(),
  });
});

app.use(errorMiddleware);

export default app;
