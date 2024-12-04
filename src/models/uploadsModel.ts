import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  codUser: { type: String, required: true }, // User identifier
  logotipo: { type: String, required: true }, // Path or URL to the logo image
});

const Upload = mongoose.model("Uploads", uploadSchema);

export default Upload;
