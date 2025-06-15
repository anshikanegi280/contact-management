import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  name: { type: String, required: true },
  phone: String,
  email: String,
  company: String,
  account: String,
}, { timestamps: true });

const contactModel = model("Contact", contactSchema);

export default contactModel;