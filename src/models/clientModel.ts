import mongoose, { Schema, Document } from "mongoose";

interface IClient extends Document {
  name: string;
  phone: string;
  codUser: string;
  whatsapp: boolean;
}

const ClientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    codUser: { type: String, required: true },
    whatsapp: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IClient>("Client", ClientSchema);
