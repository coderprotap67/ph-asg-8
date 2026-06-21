import { auth } from "@/lib/auth"; 
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import fs from "fs"; 
import path from "path"; 

export default async function ProductsPage() {
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
  let products = [];
  try {
    const filePath = path.join(process.cwd(), "src", "data", "products.json"); 
    const jsonData = fs.readFileSync(filePath, "utf-8");
    products = JSON.parse(jsonData);
  } catch (error) {
    console.error("Error parsing products JSON:", error);
    products = [];
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-neutral tracking-tight">Our Summer Collection</h1>
        <p className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
          Logged in as: {session.user.name}
        </p>
      </div>
      {products.length === 0 ? (
        <div className="text-center py-10 text-gray-500"> No products found!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const productId = product.id || product._id;

            return (
              <div key={productId} className="card bg-white shadow-md rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow">
                <figure className="h-48 bg-slate-50 flex items-center justify-center overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </figure>
                <div className="card-body p-5 space-y-2">
                  <span className="text-xs font-bold text-primary uppercase">{product.brand || "Summer"}</span>
                  <h2 className="card-title text-base font-bold text-neutral truncate">{product.name}</h2>
                  <p className="text-lg font-black text-primary">${Number(product.price).toFixed(2)}</p>
                  <div className="card-actions justify-end pt-2">
                    <Link href={`/products/${productId}`} className="btn btn-primary btn-sm text-white w-full rounded-xl bg-[#ff6b6b] border-none hover:bg-[#ff5252]">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}