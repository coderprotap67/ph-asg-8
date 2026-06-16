import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";

export async function GET(request) {
  await connectDB();
  return auth.handler(request);
}

export async function POST(request) {
  await connectDB();
  return auth.handler(request);
}