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
exports.UserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const userModel_1 = __importDefault(require("../models/userModel"));
dotenv_1.default.config();
const resetCodes = new Map();
class UserService {
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new userModel_1.default(data);
            yield newUser.save();
            return newUser;
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({ email });
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            const isPasswordValid = yield user.comparePassword(password);
            if (!isPasswordValid) {
                throw new Error("Senha incorreta");
            }
            const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, codUser: user.codUser }, process.env.JWT_SECRET || "default_secret", { expiresIn: "24h" });
            return { token, codUser: user.codUser };
        });
    }
    requestPasswordReset(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({ email });
            if (!user) {
                throw new Error("Usuário não encontrado");
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
            return resetCode;
        });
    }
    verifyResetCode(email, code, newpass) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedCode = resetCodes.get(email);
            if (!storedCode || storedCode !== code) {
                throw new Error("Código de verificação inválido");
            }
            const user = yield userModel_1.default.findOne({ email });
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            if (!newpass) {
                throw new Error("Nova senha não pode ser vazia");
            }
            user.password = newpass;
            yield user.save();
            resetCodes.delete(email);
        });
    }
    logoutUser() {
        return { message: "Logout realizado com sucesso" };
    }
}
exports.UserService = UserService;
