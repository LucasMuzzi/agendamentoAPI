import { Schema, model } from "mongoose";

const serviceTypeSchema = new Schema({
  nome: { type: String, required: true },
  codUser: { type: String, required: true },
});

const ServiceType = model("Settings", serviceTypeSchema);

export default ServiceType;
