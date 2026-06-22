import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./db"; 
const db = (await clientPromise).db(); 

export const auth = betterAuth({
  database: mongodbAdapter(db), 
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
    useSecureCookies: true,
  },
  trustedOrigins: [
    "https://ph-asg-8.vercel.app",
    "http://localhost:3000"
  ]
});