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
exports.SettingsService = void 0;
const serviceTypesModels_1 = __importDefault(require("../models/serviceTypesModels"));
const scheduleModels_1 = __importDefault(require("../models/scheduleModels"));
class SettingsService {
    createServiceType(nome, codUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const newServiceType = new serviceTypesModels_1.default({ nome, codUser });
            yield newServiceType.save();
            return newServiceType;
        });
    }
    getServiceTypes(codUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceTypes = yield serviceTypesModels_1.default.find({ codUser });
            return serviceTypes;
        });
    }
    createSchedule(horarioInicio, horarioFim, intervalo, codUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const schedule = this.generateSchedule(horarioInicio, horarioFim, intervalo);
            const existingSchedule = yield scheduleModels_1.default.findOne({ codUser });
            if (existingSchedule) {
                existingSchedule.horarios = schedule;
                yield existingSchedule.save();
                return { message: "Horários atualizados com sucesso.", schedule };
            }
            else {
                const newSchedule = new scheduleModels_1.default({ codUser, horarios: schedule });
                yield newSchedule.save();
                return { message: "Novo horário criado com sucesso.", schedule };
            }
        });
    }
    getSchedule(codUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const schedule = yield scheduleModels_1.default.findOne({ codUser });
            if (!schedule) {
                throw new Error("Nenhum horário encontrado para este codUser .");
            }
            return schedule;
        });
    }
    removeServiceType(id, codUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedServiceType = yield serviceTypesModels_1.default.findOneAndDelete({
                _id: id,
                codUser,
            });
            if (!deletedServiceType) {
                throw new Error("Tipo de serviço não encontrado ou você não tem permissão para removê-lo.");
            }
            return deletedServiceType;
        });
    }
    generateSchedule(start, end, interval) {
        const schedule = [];
        const startTime = new Date(`1970-01-01T${start}:00`);
        const endTime = new Date(`1970-01-01T${end}:00`);
        while (startTime <= endTime) {
            const hours = startTime.getHours().toString().padStart(2, "0");
            const minutes = startTime.getMinutes().toString().padStart(2, "0");
            schedule.push(`${hours}:${minutes}`);
            startTime.setMinutes(startTime.getMinutes() + interval);
        }
        return schedule;
    }
}
exports.SettingsService = SettingsService;
