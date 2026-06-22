import { auth } from "@/lib/auth"; 
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import fs from "fs"; 
import path from "path"; 

export default async function ProductDetailsPage({ params }) {
  const { id } = await params; 
  
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: await headers(), 
    });
  } catch (error) {
    console.error("Session fetch error:", error);
    session = null;
  }
  if (!session || !session.user) {
    notFound(); 
  }
  let product = null;
  try {
    const filePath = path.join(process.cwd(), "src", "data", "products.json"); 
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(jsonData);
    product = products.find((p) => String(p.id || p._id) === String(id));
  } catch (error) {
    console.error("Error finding product:", error);
  }
  if (!product) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-6">
        <Link href="/products" className="btn btn-sm btn-outline rounded-xl">
          ← Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="h-80 bg-slate-50 flex items-center justify-center overflow-hidden rounded-2xl">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
              {product.brand || "Summer Collection"}
            </span>
            <h1 className="text-3xl font-black text-neutral leading-tight mb-2">{product.name}</h1>
            <p className="text-2xl font-black text-[#ff6b6b]">${Number(product.price).toFixed(2)}</p>
            <div className="divider"></div>           
            <p className="text-slate-500 text-sm leading-relaxed">
              {product.description || "This is a premium product from our exclusive summer collection. Perfect fit, high quality fabric, and designed for ultimate comfort."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";