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
exports.atualizarAgendamento = exports.deletarAgendamento = exports.listarAgendamentos = exports.criarAgendamento = void 0;
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const criarAgendamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, data, horarios, nome, contato, isWhatsapp, tipoServico } = req.body;
    try {
        // Criar um novo agendamento para cada horário
        const novosAgendamentos = horarios.map((horario) => {
            return new appointmentModel_1.default({
                userId,
                data,
                horarios: horario, // Salve o horário individualmente
                nome,
                contato,
                isWhatsapp,
                tipoServico,
            });
        });
        // Salvar todos os agendamentos no banco de dados
        const agendamentosSalvos = yield Promise.all(novosAgendamentos.map((agendamento) => agendamento.save()));
        res.status(201).json(agendamentosSalvos); // Retornar todos os agendamentos salvos
    }
    catch (error) {
        console.error("Erro ao salvar agendamento:", error);
        res.status(500).json({ message: "Erro ao salvar agendamento", error });
    }
});
exports.criarAgendamento = criarAgendamento;
const listarAgendamentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const agendamentos = yield appointmentModel_1.default.find(userId ? { userId } : {});
        res.status(200).json(agendamentos);
    }
    catch (error) {
        console.error("Erro ao listar agendamentos:", error);
        res.status(500).json({ message: "Erro ao listar agendamentos", error });
    }
});
exports.listarAgendamentos = listarAgendamentos;
const deletarAgendamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codUser, id, horario } = req.body;
    try {
        if (!horario) {
            return res.status(400).json({ message: "Horário inválido." });
        }
        const resultado = yield appointmentModel_1.default.findOneAndUpdate({ userId: codUser, _id: id }, { $pull: { horarios: horario } }, { new: true });
        if (!resultado) {
            return res.status(404).json({ message: "Agendamento não encontrado" });
        }
        return res.status(200).json({
            message: "Horário excluído com sucesso",
            agendamento: resultado,
        });
    }
    catch (error) {
        console.error("Erro ao excluir horário:", error);
        return res.status(500).json({ message: "Erro ao excluir horário", error });
    }
});
exports.deletarAgendamento = deletarAgendamento;
const atualizarAgendamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userId, data, horarios, nome, contato, isWhatsapp, tipoServico } = req.body;
    try {
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
            return res.status(404).json({ message: "Agendamento não encontrado" });
        }
        res.status(200).json(agendamentoAtualizado);
    }
    catch (error) {
        console.error("Erro ao atualizar agendamento:", error);
        res.status(500).json({ message: "Erro ao atualizar agendamento", error });
    }
});
exports.atualizarAgendamento = atualizarAgendamento;
