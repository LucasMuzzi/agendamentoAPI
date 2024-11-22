// models/agendamentoModel.ts
import mongoose, { Document, Schema } from "mongoose";

interface IAgendamento extends Document {
  userId?: any;
  data?: Date;
  horarios?: string[];
  nome?: string;
  contato?: string;
  isWhatsapp?: boolean;
  tipoServico?: string;
}

const agendamentoSchema = new Schema<IAgendamento>({
  userId: { type: String, required: true },
  data: { type: Date, required: true },
  horarios: { type: [String], required: true },
  nome: { type: String, required: true },
  contato: { type: String, required: true },
  isWhatsapp: { type: Boolean, required: true }, // Adicione esta linha
  tipoServico: { type: String, required: true },
});

const Agendamento = mongoose.model<IAgendamento>(
  "Agendamento",
  agendamentoSchema
);

export default Agendamento;
