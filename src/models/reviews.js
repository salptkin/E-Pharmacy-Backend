import { Schema, model } from "mongoose";
import handleMongooseError from "../services/handleMongooseError.js";

const ReviewsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    testimonial: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

ReviewsSchema.post("save", handleMongooseError);

const reviews = model("review", ReviewsSchema);

export {
  reviews,
};