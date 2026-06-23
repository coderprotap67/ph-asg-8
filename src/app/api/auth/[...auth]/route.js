import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb"; 

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Product ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("SunCartDB"); 

    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}