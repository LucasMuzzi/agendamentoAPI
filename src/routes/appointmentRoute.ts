import { Router } from "express";
import { AppointmentController } from "../controllers/appointmentController";

const router = Router();
const appointmentController = new AppointmentController();

router.post("/create-appointment", appointmentController.criarAgendamento);
router.post("/find-appointment", appointmentController.listarAgendamentos);
router.post("/delete-appointment", appointmentController.deletarAgendamento);
router.post("/update-appointment", appointmentController.atualizarAgendamento);

export default router;
