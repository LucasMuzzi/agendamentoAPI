import multer from "multer";

import path from "path";
import fs from "fs";

// Configuração do armazenamento
const uploadsDir = path.join(__dirname, "../uploads"); // Ajuste o caminho para subir um nível

// Verifica se a pasta existe, se não, cria
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Usa a pasta de uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome do arquivo
  },
});
// Inicializa o multer com a configuração de armazenamento
export const upload = multer({ storage: storage });
