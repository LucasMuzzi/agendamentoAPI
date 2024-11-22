"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/agendamentoRoutes.ts
const express_1 = require("express");
const appointmentController_1 = require("../controllers/appointmentController");
const router = (0, express_1.Router)();
router.post("/create-appointment", appointmentController_1.criarAgendamento);
router.post("/find-appointment", appointmentController_1.listarAgendamentos);
router.post("/delete-appointment", appointmentController_1.deletarAgendamento);
router.post("/update-appointment/", appointmentController_1.atualizarAgendamento);
exports.default = router;
