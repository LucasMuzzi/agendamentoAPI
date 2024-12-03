"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // Importe o CORS
const mongodatabase_1 = __importDefault(require("./config/mongodatabase"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const appointmentRoute_1 = __importDefault(require("./routes/appointmentRoute"));
const clientRoute_1 = __importDefault(require("./routes/clientRoute"));
const settingsRoute_1 = __importDefault(require("./routes/settingsRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configuração do CORS
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, mongodatabase_1.default)();
app.use("/api", userRoute_1.default);
app.use("/api", appointmentRoute_1.default);
app.use("/api", clientRoute_1.default);
app.use('/api', settingsRoute_1.default);
// Manter API ativa
app.get("/api/health", (req, res) => {
    res.status(200).json({
        message: "API is running!",
        timestamp: new Date().toISOString(),
    });
});
app.use(errorMiddleware_1.default);
exports.default = app;
