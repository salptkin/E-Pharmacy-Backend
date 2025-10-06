import { Schema, model } from "mongoose";
import handleMongooseError from "../services/handleMongooseError.js";

const nearestStoresSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

nearestStoresSchema.post("save", handleMongooseError);

const NearestStore = model("nearest_pharmacy", nearestStoresSchema);

export {
  NearestStore,
};