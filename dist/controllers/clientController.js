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
exports.ClientController = void 0;
const clientService_1 = require("../service/clientService");
class ClientController {
    constructor() {
        this.registerClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, phone, codUser, whatsapp } = req.body;
            try {
                if (!name || !phone || !codUser || whatsapp === undefined) {
                    return res
                        .status(400)
                        .json({ message: "Todos os campos são obrigatórios." });
                }
                const newClient = yield this.clientService.registerClient(name, phone, codUser, whatsapp);
                res.status(201).json({
                    message: "Cliente cadastrado com sucesso!",
                    client: newClient,
                });
            }
            catch (error) {
                console.error("Erro ao cadastrar cliente:", error);
                res.status(500).json({ message: "Erro ao cadastrar cliente", error });
            }
        });
        this.getClientsByCodUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { codUser } = req.body;
            try {
                if (!codUser) {
                    return res
                        .status(400)
                        .json({ message: "O campo codUser  é obrigatório." });
                }
                const clients = yield this.clientService.getClientsByCodUser(codUser);
                res.status(200).json({ clients });
            }
            catch (error) {
                console.error("Erro ao buscar clientes:", error);
                res.status(500).json({ message: "Erro ao buscar clientes", error });
            }
        });
        this.updateClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { codUser, name, phone, whatsapp } = req.body;
            try {
                const updatedClient = yield this.clientService.updateClient(id, codUser, name, phone, whatsapp);
                res.status(200).json({
                    message: "Cliente atualizado com sucesso!",
                    client: updatedClient,
                });
            }
            catch (error) {
                console.error("Erro ao atualizar cliente:", error);
                res.status(500).json({ message: "Erro ao atualizar cliente", error });
            }
        });
        this.deleteClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { codUser } = req.body;
            try {
                yield this.clientService.deleteClient(id, codUser);
                res.status(200).json({ message: "Cliente excluído com sucesso!" });
            }
            catch (error) {
                console.error("Erro ao excluir cliente:", error);
                res.status(500).json({ message: "Erro ao excluir cliente", error });
            }
        });
        this.clientService = new clientService_1.ClientService();
    }
}
exports.ClientController = ClientController;
