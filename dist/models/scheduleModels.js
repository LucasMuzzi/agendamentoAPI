"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const scheduleSchema = new mongoose_1.Schema({
    codUser: { type: String, required: true },
    horarios: { type: [String], required: true }, // Array de horários
});
const Schedule = (0, mongoose_1.model)("Schedule", scheduleSchema);
exports.default = Schedule;
