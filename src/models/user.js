import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, default: "" },
    provider: { type: String, required: true, enum: ["credential", "google"] },
    password: { type: String },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);