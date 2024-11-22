// routes/agendamentoRoutes.ts
import { Router } from "express";
import {
  atualizarAgendamento,
  criarAgendamento,
  deletarAgendamento,
  listarAgendamentos,
} from "../controllers/appointmentController";

const router = Router();

router.post("/create-appointment", criarAgendamento);
router.post("/find-appointment", listarAgendamentos);
router.post("/delete-appointment", deletarAgendamento);
router.post("/update-appointment/", atualizarAgendamento);

export default router;
