import { Schema, model } from "mongoose";
import handleMongooseError from "../services/handleMongooseError.js";

const productsSchema = new Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    suppliers: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

productsSchema.post("save", handleMongooseError);

const Product = model("product", productsSchema);

export { Product };