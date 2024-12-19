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
exports.AppointmentService = void 0;
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
class AppointmentService {
    criarAgendamento(userId, data, horarios, nome, contato, isWhatsapp, tipoServico) {
        return __awaiter(this, void 0, void 0, function* () {
            const novosAgendamentos = horarios.map((horario) => {
                return new appointmentModel_1.default({
                    userId,
                    data,
                    horarios: horario,
                    nome,
                    contato,
                    isWhatsapp,
                    tipoServico,
                });
            });
            const agendamentosSalvos = yield Promise.all(novosAgendamentos.map((agendamento) => agendamento.save()));
            return agendamentosSalvos;
        });
    }
    listarAgendamentos(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const agendamentos = yield appointmentModel_1.default.find(userId ? { userId } : {});
            return agendamentos;
        });
    }
    deletarAgendamento(codUser, id, horario) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!horario) {
                throw new Error("Horário inválido.");
            }
            const resultado = yield appointmentModel_1.default.findOneAndUpdate({ userId: codUser, _id: id }, { $pull: { horarios: horario } }, { new: true });
            if (!resultado) {
                throw new Error("Agendamento não encontrado");
            }
            return resultado;
        });
    }
    atualizarAgendamento(id, userId, data, horarios, nome, contato, isWhatsapp, tipoServico) {
        return __awaiter(this, void 0, void 0, function* () {
            const agendamentoAtualizado = yield appointmentModel_1.default.findByIdAndUpdate(id, {
                userId,
                data,
                horarios,
                nome,
                contato,
                isWhatsapp,
                tipoServico,
            }, { new: true });
            if (!agendamentoAtualizado) {
                throw new Error("Agendamento não encontrado");
            }
            return agendamentoAtualizado;
        });
    }
}
exports.AppointmentService = AppointmentService;
