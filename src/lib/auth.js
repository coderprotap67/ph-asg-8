import { betterAuth } from "better-auth";
import mongoose from "mongoose";

export const auth = betterAuth({
  database: {
    db: mongoose.connection.db,
    type: "mongodb"
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});