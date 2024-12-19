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
exports.ClientService = void 0;
const clientModel_1 = __importDefault(require("../models/clientModel"));
class ClientService {
    registerClient(name, phone, codUser, whatsapp) {
        return __awaiter(this, void 0, void 0, function* () {
            const newClient = new clientModel_1.default({ name, phone, codUser, whatsapp });
            yield newClient.save();
            return newClient;
        });
    }
    getClientsByCodUser(codUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield clientModel_1.default.find({ codUser }).exec();
            return clients;
        });
    }
    updateClient(id, codUser, name, phone, whatsapp) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield clientModel_1.default.findById(id);
            if (!client) {
                throw new Error("Cliente não encontrado.");
            }
            if (client.codUser !== codUser) {
                throw new Error("Acesso negado. codUser  inválido.");
            }
            const updatedClient = yield clientModel_1.default.findByIdAndUpdate(id, { name, phone, whatsapp }, { new: true });
            return updatedClient;
        });
    }
    deleteClient(id, codUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield clientModel_1.default.findById(id);
            if (!client) {
                throw new Error("Cliente não encontrado.");
            }
            if (client.codUser !== codUser) {
                throw new Error("Acesso negado. codUser  inválido.");
            }
            yield clientModel_1.default.findByIdAndDelete(id);
        });
    }
}
exports.ClientService = ClientService;
