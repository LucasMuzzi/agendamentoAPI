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
exports.AppointmentController = void 0;
const appointmentService_1 = require("../service/appointmentService");
class AppointmentController {
    constructor() {
        this.criarAgendamento = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId, data, horarios, nome, contato, isWhatsapp, tipoServico } = req.body;
            try {
                const agendamentosSalvos = yield this.appointmentService.criarAgendamento(userId, data, horarios, nome, contato, isWhatsapp, tipoServico);
                res.status(201).json(agendamentosSalvos);
            }
            catch (error) {
                console.error("Erro ao salvar agendamento:", error);
                res.status(500).json({ message: "Erro ao salvar agendamento", error });
            }
        });
        this.listarAgendamentos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.query;
            try {
                const agendamentos = yield this.appointmentService.listarAgendamentos(userId);
                res.status(200).json(agendamentos);
            }
            catch (error) {
                console.error("Erro ao listar agendamentos:", error);
                res.status(500).json({ message: "Erro ao listar agendamentos", error });
            }
        });
        this.deletarAgendamento = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { codUser, id, horario } = req.body;
            try {
                const resultado = yield this.appointmentService.deletarAgendamento(codUser, id, horario);
                return res.status(200).json({
                    message: "Horário excluído com sucesso",
                    agendamento: resultado,
                });
            }
            catch (error) {
                console.error("Erro ao excluir horário:", error);
                return res
                    .status(500)
                    .json({ message: "Erro ao excluir horário", error });
            }
        });
        this.atualizarAgendamento = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, userId, data, horarios, nome, contato, isWhatsapp, tipoServico, } = req.body;
            try {
                const agendamentoAtualizado = yield this.appointmentService.atualizarAgendamento(id, userId, data, horarios, nome, contato, isWhatsapp, tipoServico);
                res.status(200).json(agendamentoAtualizado);
            }
            catch (error) {
                console.error("Erro ao atualizar agendamento:", error);
                res.status(500).json({ message: "Erro ao atualizar agendamento", error });
            }
        });
        this.appointmentService = new appointmentService_1.AppointmentService();
    }
}
exports.AppointmentController = AppointmentController;
