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
exports.SettingsController = void 0;
const settingsService_1 = require("../service/settingsService");
class SettingsController {
    constructor() {
        this.createServiceType = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, codUser } = req.body;
                if (!nome || !codUser) {
                    res.status(400).json({
                        message: "O nome do serviço e o codUser  são obrigatórios.",
                    });
                    return;
                }
                const newServiceType = yield this.settingsService.createServiceType(nome, codUser);
                res.status(201).json(newServiceType);
            }
            catch (error) {
                next(error);
            }
        });
        this.getServiceTypes = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { codUser } = req.body;
                if (!codUser) {
                    res.status(400).json({ message: "O codUser  é obrigatório." });
                    return;
                }
                const serviceTypes = yield this.settingsService.getServiceTypes(codUser);
                res.status(200).json(serviceTypes);
            }
            catch (error) {
                next(error);
            }
        });
        this.createSchedule = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { horarioInicio, horarioFim, intervalo, codUser } = req.body;
                if (!horarioInicio || !horarioFim || !intervalo || !codUser) {
                    res.status(400).json({
                        message: "horarioInicio, horarioFim, intervalo e codUser  são obrigatórios.",
                    });
                    return;
                }
                const intervalNumber = parseInt(intervalo, 10);
                if (isNaN(intervalNumber) || intervalNumber <= 0) {
                    res.status(400).json({
                        message: "Intervalo deve ser um número maior que zero.",
                    });
                    return;
                }
                const { message, schedule } = yield this.settingsService.createSchedule(horarioInicio, horarioFim, intervalNumber, codUser);
                res.status(200).json({ message, schedule, codUser });
            }
            catch (error) {
                next(error);
            }
        });
        this.getSchedule = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { codUser } = req.body;
                if (!codUser) {
                    res.status(400).json({ message: "O codUser  é obrigatório." });
                    return;
                }
                const schedule = yield this.settingsService.getSchedule(codUser);
                res.status(200).json(schedule);
            }
            catch (error) {
                next(error);
            }
        });
        this.removeServiceType = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, codUser } = req.body;
                if (!id || !codUser) {
                    res.status(400).json({
                        message: "O ID do serviço e o codUser   são obrigatórios.",
                    });
                    return;
                }
                const deletedServiceType = yield this.settingsService.removeServiceType(id, codUser);
                res.status(200).json({
                    message: "Tipo de serviço removido com sucesso.",
                    deletedServiceType,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.settingsService = new settingsService_1.SettingsService();
    }
}
exports.SettingsController = SettingsController;
