import { Schema, model } from "mongoose";

const scheduleSchema = new Schema({
  codUser: { type: String, required: true },
  horarios: { type: [String], required: true }, // Array de horários
});

const Schedule = model("Schedule", scheduleSchema);

export default Schedule;
