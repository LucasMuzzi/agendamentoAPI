import { Schema, model } from "mongoose";

const serviceTypeSchema = new Schema({
  nome: { type: String, required: true },
  codUser: { type: String, required: true },
});

const ServiceType = model("ServiceTypes", serviceTypeSchema);

export default ServiceType;
