"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.verifyResetCode = exports.requestPasswordReset = exports.loginUser = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const userModel_1 = __importDefault(require("../models/userModel"));
dotenv_1.default.config();
const resetCodes = new Map();
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, codUser } = req.body;
        const newUser = new userModel_1.default({ name, email, password, codUser });
        yield newUser.save();
        res
            .status(201)
            .json({ message: "Usuário criado com sucesso", user: newUser });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }
        const isPasswordValid = yield user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Senha incorreta" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, codUser: user.codUser }, process.env.JWT_SECRET || "default_secret", { expiresIn: "24h" });
        res.status(200).json({
            token,
            codUser: user.codUser,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const requestPasswordReset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }
        const resetCode = (0, crypto_1.randomBytes)(4).toString("hex");
        resetCodes.set(email, resetCode);
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });
        yield transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Recuperação de senha",
            text: `Seu código de verificação é: ${resetCode}`,
        });
        res
            .status(200)
            .json({ message: "Código de verificação enviado para o e-mail" });
    }
    catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        next(error);
    }
});
exports.requestPasswordReset = requestPasswordReset;
const verifyResetCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, code, newpass } = req.body;
        const storedCode = resetCodes.get(email);
        if (!storedCode || storedCode !== code) {
            res.status(400).json({ message: "Código de verificação inválido" });
            return;
        }
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }
        if (!newpass) {
            res.status(400).json({ message: "Nova senha não pode ser vazia" });
            return;
        }
        user.password = newpass;
        yield user.save();
        resetCodes.delete(email);
        res.status(200).json({ message: "Senha redefinida com sucesso" });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyResetCode = verifyResetCode;
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Para JWT, você pode simplesmente informar ao cliente para remover o token.
        // Se você estiver usando um sistema de blacklist, adicione o token à blacklist aqui.
        res.status(200).json({ message: "Logout realizado com sucesso" });
    }
    catch (error) {
        next(error);
    }
});
exports.logoutUser = logoutUser;
