import { getProductById } from "@/actions/productActions";
import { auth } from "@/lib/auth"; 
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({ params }) {
  const resolvedParams = await params;

  let session = null;
  try {
    session = await auth.api.getSession({
      headers: new Headers(),
    });
  } catch (error) {
    session = null;
  }

  if (!session || !session.user) {
    notFound();
  }

  const product = await getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100">
        <div className="rounded-2xl overflow-hidden shadow-inner bg-slate-50 border border-slate-100 flex items-center justify-center h-[450px]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-between py-2 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">{product.brand}</span>
                <h1 className="text-3xl font-extrabold tracking-tight mt-2 text-neutral">{product.name}</h1>
              </div>
              <span className="text-sm font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full">★ {product.rating}</span>
            </div>
            <p className="text-2xl font-black text-primary">${Number(product.price).toFixed(2)}</p>
            <div className="divider"></div>
            <p className="text-slate-500 leading-relaxed text-sm md:text-base">{product.description}</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-400">
              <span>Category: <strong className="text-neutral">{product.category}</strong></span>
              <span>Stock Status: <strong className={product.stock > 20 ? "text-success" : "text-amber-500"}>{product.stock} units ready</strong></span>
            </div>
            <button className="btn btn-primary w-full text-white shadow-lg shadow-primary/20 rounded-xl py-3 font-bold h-auto">
              Add To Shopping bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}