import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

export const Product = models.Product || model("Product", ProductSchema);