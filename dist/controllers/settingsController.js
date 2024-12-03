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
exports.getServiceTypes = exports.createServiceType = void 0;
const settingsModels_1 = __importDefault(require("../models/settingsModels"));
const createServiceType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, codUser } = req.body;
        if (!nome || !codUser) {
            res.status(400).json({
                message: "O nome do serviço e o codUser  são obrigatórios.",
            });
            return;
        }
        const newServiceType = new settingsModels_1.default({ nome, codUser });
        yield newServiceType.save();
        res.status(201).json(newServiceType);
    }
    catch (error) {
        next(error);
    }
});
exports.createServiceType = createServiceType;
const getServiceTypes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codUser } = req.body;
        if (!codUser) {
            res.status(400).json({ message: "O codUser  é obrigatório." });
            return;
        }
        const serviceTypes = yield settingsModels_1.default.find({ codUser });
        res.status(200).json(serviceTypes);
    }
    catch (error) {
        next(error);
    }
});
exports.getServiceTypes = getServiceTypes;
