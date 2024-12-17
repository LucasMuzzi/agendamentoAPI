import { Request, Response } from "express";
import { AppointmentService } from "../service/appointmentService";

export class AppointmentController {
  private appointmentService: AppointmentService;

  constructor() {
    this.appointmentService = new AppointmentService();
  }

  public criarAgendamento = async (req: Request, res: Response) => {
    const { userId, data, horarios, nome, contato, isWhatsapp, tipoServico } =
      req.body;

    try {
      const agendamentosSalvos = await this.appointmentService.criarAgendamento(
        userId,
        data,
        horarios,
        nome,
        contato,
        isWhatsapp,
        tipoServico
      );
      res.status(201).json(agendamentosSalvos);
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error);
      res.status(500).json({ message: "Erro ao salvar agendamento", error });
    }
  };

  public listarAgendamentos = async (req: Request, res: Response) => {
    const { userId } = req.query;

    try {
      const agendamentos = await this.appointmentService.listarAgendamentos(
        userId as string
      );
      res.status(200).json(agendamentos);
    } catch (error) {
      console.error("Erro ao listar agendamentos:", error);
      res.status(500).json({ message: "Erro ao listar agendamentos", error });
    }
  };

  public deletarAgendamento = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { codUser, id, horario } = req.body;

    try {
      const resultado = await this.appointmentService.deletarAgendamento(
        codUser,
        id,
        horario
      );
      return res.status(200).json({
        message: "Horário excluído com sucesso",
        agendamento: resultado,
      });
    } catch (error) {
      console.error("Erro ao excluir horário:", error);
      return res
        .status(500)
        .json({ message: "Erro ao excluir horário", error });
    }
  };

  public atualizarAgendamento = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const {
      id,
      userId,
      data,
      horarios,
      nome,
      contato,
      isWhatsapp,
      tipoServico,
    } = req.body;

    try {
      const agendamentoAtualizado =
        await this.appointmentService.atualizarAgendamento(
          id,
          userId,
          data,
          horarios,
          nome,
          contato,
          isWhatsapp,
          tipoServico
        );
      res.status(200).json(agendamentoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
      res.status(500).json({ message: "Erro ao atualizar agendamento", error });
    }
  };
}
