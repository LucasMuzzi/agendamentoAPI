import Agendamento from "../models/appointmentModel";

export class AppointmentService {
  async criarAgendamento(
    userId: string,
    data: string,
    horarios: string[],
    nome: string,
    contato: string,
    isWhatsapp: boolean,
    tipoServico: string
  ) {
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

    return agendamentosSalvos;
  }

  async listarAgendamentos(userId?: string) {
    const agendamentos = await Agendamento.find(userId ? { userId } : {});
    return agendamentos;
  }

  async deletarAgendamento(codUser: string, id: string, horario: string) {
    if (!horario) {
      throw new Error("Horário inválido.");
    }

    const resultado = await Agendamento.findOneAndUpdate(
      { userId: codUser, _id: id },
      { $pull: { horarios: horario } },
      { new: true }
    );

    if (!resultado) {
      throw new Error("Agendamento não encontrado");
    }

    return resultado;
  }

  async atualizarAgendamento(
    id: string,
    userId: string,
    data: string,
    horarios: string[],
    nome: string,
    contato: string,
    isWhatsapp: boolean,
    tipoServico: string
  ) {
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
      throw new Error("Agendamento não encontrado");
    }

    return agendamentoAtualizado;
  }
}
