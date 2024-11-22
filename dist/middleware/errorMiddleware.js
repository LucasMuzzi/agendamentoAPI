"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Algo deu errado", error: err.message });
};
exports.default = errorMiddleware;
