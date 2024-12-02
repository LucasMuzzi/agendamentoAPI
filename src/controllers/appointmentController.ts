// controllers/agendamentoController.ts
import { Request, Response } from "express";
import Agendamento from "../models/appointmentModel";

export const criarAgendamento = async (req: Request, res: Response) => {
  const { userId, data, horarios, nome, contato, isWhatsapp, tipoServico } =
    req.body;

  try {
    const novosAgendamentos = horarios.map((horario: string) => {
      return new Agendamento({
        userId,
        data,
        horarios: horario,
        nome,
        contato,
        isWhatsapp,
        tipoServico,
      });
    });

    const agendamentosSalvos = await Promise.all(
      novosAgendamentos.map((agendamento: any) => agendamento.save())
    );

    res.status(201).json(agendamentosSalvos);
  } catch (error) {
    console.error("Erro ao salvar agendamento:", error);
    res.status(500).json({ message: "Erro ao salvar agendamento", error });
  }
};

export const listarAgendamentos = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const agendamentos = await Agendamento.find(userId ? { userId } : {});
    res.status(200).json(agendamentos);
  } catch (error) {
    console.error("Erro ao listar agendamentos:", error);
    res.status(500).json({ message: "Erro ao listar agendamentos", error });
  }
};

export const deletarAgendamento = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { codUser, id, horario } = req.body;

  try {
    if (!horario) {
      return res.status(400).json({ message: "Horário inválido." });
    }

    const resultado = await Agendamento.findOneAndUpdate(
      { userId: codUser, _id: id },
      { $pull: { horarios: horario } },
      { new: true }
    );

    if (!resultado) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }

    return res.status(200).json({
      message: "Horário excluído com sucesso",
      agendamento: resultado,
    });
  } catch (error) {
    console.error("Erro ao excluir horário:", error);
    return res.status(500).json({ message: "Erro ao excluir horário", error });
  }
};

export const atualizarAgendamento = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id, userId, data, horarios, nome, contato, isWhatsapp, tipoServico } =
    req.body;

  try {
    const agendamentoAtualizado = await Agendamento.findByIdAndUpdate(
      id,
      {
        userId,
        data,
        horarios,
        nome,
        contato,
        isWhatsapp,
        tipoServico,
      },
      { new: true }
    );

    if (!agendamentoAtualizado) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }

    res.status(200).json(agendamentoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error);
    res.status(500).json({ message: "Erro ao atualizar agendamento", error });
  }
};
