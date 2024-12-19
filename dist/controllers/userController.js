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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../service/userService");
class UserController {
    constructor() {
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, codUser } = req.body;
                const newUser = yield this.userService.createUser({
                    name,
                    email,
                    password,
                    codUser,
                });
                res
                    .status(201)
                    .json({ message: "Usuário criado com sucesso", user: newUser });
            }
            catch (error) {
                next(error);
            }
        });
        this.loginUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { token, codUser } = yield this.userService.loginUser(email, password);
                res.status(200).json({ token, codUser });
            }
            catch (error) {
                next(error);
            }
        });
        this.requestPasswordReset = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield this.userService.requestPasswordReset(email);
                res
                    .status(200)
                    .json({ message: "Código de verificação enviado para o e-mail" });
            }
            catch (error) {
                console.error("Erro ao enviar e-mail:", error);
                next(error);
            }
        });
        this.verifyResetCode = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, code, newpass } = req.body;
                yield this.userService.verifyResetCode(email, code, newpass);
                res.status(200).json({ message: "Senha redefinida com sucesso" });
            }
            catch (error) {
                next(error);
            }
        });
        this.logoutUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const message = this.userService.logoutUser();
                res.status(200).json(message);
            }
            catch (error) {
                next(error);
            }
        });
        this.userService = new userService_1.UserService();
    }
}
exports.UserController = UserController;
