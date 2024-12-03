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
exports.getClientsByCodUser = exports.registerClient = void 0;
const clientModel_1 = __importDefault(require("../models/clientModel"));
const registerClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, codUser, whatsapp } = req.body;
    try {
        if (!name || !phone || !codUser || !whatsapp) {
            return res
                .status(400)
                .json({ message: "Todos os campos são obrigatórios." });
        }
        const newClient = new clientModel_1.default({ name, phone, codUser, whatsapp });
        yield newClient.save();
        res
            .status(201)
            .json({ message: "Cliente cadastrado com sucesso!", client: newClient });
    }
    catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
        res.status(500).json({ message: "Erro ao cadastrar cliente", error });
    }
});
exports.registerClient = registerClient;
const getClientsByCodUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codUser } = req.body;
    try {
        if (!codUser) {
            return res
                .status(400)
                .json({ message: "O campo codUser  é obrigatório." });
        }
        const clients = yield clientModel_1.default.find({ codUser }).exec();
        res.status(200).json({ clients });
    }
    catch (error) {
        console.error("Erro ao buscar clientes:", error);
        res.status(500).json({ message: "Erro ao buscar clientes", error });
    }
});
exports.getClientsByCodUser = getClientsByCodUser;
